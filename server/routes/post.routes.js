import express from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { generatePost, getGenerations, getPosts, schedulePost } from '../controllers/post.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const postRouter = express.Router()

postRouter.get('/', verifyJWT, getPosts)
postRouter.get('/generations', verifyJWT, getGenerations)
postRouter.post('/', verifyJWT,upload.single('media'), schedulePost)
postRouter.post('/generate', verifyJWT, generatePost)

export default postRouter;
