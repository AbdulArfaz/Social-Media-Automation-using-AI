import cron from 'node-cron'
import { Post } from '../models/post.model.js'
import { Accounts } from '../models/account.model.js'
import { ActivityLog } from '../models/activityLog.model.js'
import zernio from '../db/zernio.js'

export const initScheduler = () =>{
    cron.schedule("* * * * *", async ()=>{
       try {
        const now = new Date()
        const postsToPublished = await Post.find({status: "scheduled", scheduledFor: {$lte: now}})

        for (const post of postsToPublished) {
            try {
                const accounts = await Accounts.find({
                    user: post.user,
                    platform: {$in: post.platforms},
                    status: "connected",
                    zernioAccountId: {$exists: true}
                })

               if(accounts.length === 0){
                console.log(`No connected Zernio accounts found for post ${post._id}`)
                continue;
               } 
               const zernioPlatforms = accounts.map((acc)=>({
                tform: acc.platform,
                accountId: acc.zernioAccountId,
               }))

               const payload = {
                content: post.content,
                publishedNow: true,
                ...(post.mediaUrl ? {
                    mediaItems: [{
                        type: post.mediaType || "image",
                        url: post.mediaUrl
                }]
                } : {}),
                platforms: zernioPlatforms,
               }
               console.log(`Publishing post ${post._id} to Zernio with media: ${post.mediaUrl || 'none'}`)

               const response = await zernio.posts.createPost({
                body: payload
               })

               const publishedPost = response.data?.post || response.data
               if(!publishedPost){
                throw new Error('Failed to get post object from Zernio response')
               }
               console.log(`Zernio post created: ${publishedPost._id || publishedPost.id}`)

               post.status = 'published';
               await post.save()

               await ActivityLog.create({
                user: post.user,
                actionType: 'POST_PUBLISHED',
                description: `Published post to ${accounts.map((a) => a.platform).join(", ")}`,
                relatedPost: post._id,
               })
            } catch (error) {
                console.error(`Failed to published post ${post._id}:`, error?.response?.data || error?.message)
                post.status = 'failed'
                await post.save()
            }
        }
        if(postsToPublished.length > 0){
            console.log(`Evaluated ${postsToPublished.length} posts at ${now.toISOString()}`)
        }
       } catch (error) {
        console.error("Error in scheduler:", error)
       }
    })
    console.log('Scheduler service initialized.')
}