import { GoogleGenAI } from "@google/genai";
import axios from 'axios'
import uploadOnCloudinary from "../db/cloudinary.js";
import { Generation } from '../models/generation.model.js'
import { Post } from '../models/post.model.js';
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


//helper to poll leonardo.ai
const pollLeonardoJob = async (generationId, apiKey) => {
    const maxRetries = 20;
    const delay = 5000; 

    for (let i = 0; i < maxRetries; i++) {
        try {
            const response = await axios.get(`https://cloud.leonardo.ai/api/rest/v1/generations/${generationId}`, {
                headers: {
                    accept: "application/json",
                    authorization: `Bearer ${apiKey}`
                }
            });

            const generation = response.data.generations_by_pk;

            if (generation.status === 'COMPLETE') {
                if (generation.generated_images && generation.generated_images.length > 0) {
                    return generation.generated_images[0].url;
                }
                throw new Error('Generation complete but no image found.');
            }

            if (generation.status === 'FAILED') {
                throw new Error('Leonardo.ai generation failed');
            }
        } catch (error) {
            console.error('Polling error:', error?.response?.data || error.message);
        }

        await new Promise((resolve) => setTimeout(resolve, delay));
    }

    throw new Error('Leonardo.ai generation timed out after maximum retries');
};




export const generatePost = asyncHandler(async (req, res) => {
    const { prompt, tone, generateImage } = req.body;

    // 1. Validate API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        throw new ApiError(400, "Gemini API Key is missing. Please add it to your server/.env file.");
    }

    // 2. Validate user input
    if (!prompt) {
        throw new ApiError(400, "Prompt is required.");
    }

    // 3. Initialize the Google Gen AI SDK
    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a social media post based on this prompt: "${prompt}".
        Tone: ${tone}.
        Include relevant hashtags.
        Format the response as JSON with "content" and "imagePrompt" fields.
        The "imagePrompt" should be a highly descriptive prompt for an image generator that complements the post.`
    });


    let content = "";
    let imagePrompt = prompt;

    try {
        const rawText = response.text || "";
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        const data = jsonMatch ? JSON.parse(jsonMatch[0]) : { content: rawText, imagePrompt: prompt };
        content = data.content;
        imagePrompt = data.imagePrompt;
    } catch (e) {
        content = response.text || "";
    }

    let mediaUrl = "";

    if (generateImage) {
        const leonardoKey = process.env.LEONARDO_API_KEY;
        if (!leonardoKey) {
            throw new ApiError(400, "Leonardo API Key is missing.");
        }

        const leoResponse = await axios.post('https://cloud.leonardo.ai/api/rest/v2/generations', {
            public: false,
            model: "gpt-image-2",
            parameters: {
                quality: "LOW",
                prompt: imagePrompt,
                quantity: 1,
                width: 1024,
                height: 1024,
                prompt_enhance: "OFF"
            }
        }, {
            headers: {
                accept: "application/json",
                authorization: `Bearer ${leonardoKey}`,
                "content-type": "application/json"
            }
        });

        const generationId = leoResponse.data.generate.generationId;
        const tempUrl = await pollLeonardoJob(generationId, leonardoKey);

        // Upload remote URL directly using Cloudinary SDK
        const uploadResult = await uploadOnCloudinary.uploader.upload(tempUrl, {
            folder: "ai-generations",
        });
        mediaUrl = uploadResult.secure_url;
    }

    const generation = await Generation.create({
        user: req.user._id,
        prompt,
        content,
        mediaUrl,
        mediaType: mediaUrl ? 'image' : undefined,
        tone
    });

    return res.status(201).json(
        new ApiResponse(201, generation, "Post generated successfully")
    );
});




// Get all generations for the authenticated user
export const getGenerations = asyncHandler(async (req, res) => {
    const generations = await Generation.find({ user: req.user._id }).sort({ createdAt: -1 });

    return res.status(200).json(
        new ApiResponse(200, generations, "Generations fetched successfully")
    );
});


// Get all posts for the authenticated user
export const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ user: req.user._id }).sort({createdAt: -1})

    return res.status(200).json(
        new ApiResponse(200, posts, "Posts fetched successfully")
    );
});


// Schedule post
// POST /api/posts
export const schedulePost = asyncHandler(async (req, res) => {

    let rawPlatforms = req.body.platforms || req.body.platform;

    // Parse platforms if it comes as a stringified array from FormData
    let parsedPlatforms = rawPlatforms;
    if (typeof rawPlatforms === "string") {
        try {
            parsedPlatforms = JSON.parse(rawPlatforms).map(p => typeof p === 'string' ? p : p.name)
        } catch (e) {
            parsedPlatforms = rawPlatforms.split(",")
        }
    }
    if(!Array.isArray(parsedPlatforms) && parsedPlatforms){
        parsedPlatforms = [parsedPlatforms]
    }

    const { content, scheduledFor, status } = req.body;

    let mediaUrl = req.body.mediaUrl;
    let mediaType = req.body.mediaType;

    if (req.file) {
        // Since multer uses diskStorage, we can use your custom uploadOnCloudinary utility directly!
        const uploadResult = await uploadOnCloudinary(req.file.path);
        
        if (!uploadResult) {
            throw new ApiError(500, "Failed to upload media file to Cloudinary");
        }

        mediaUrl = uploadResult.secure_url;
        mediaType = uploadResult.resource_type === 'video' ? 'video' : 'image';
    }

    const post = await Post.create({
        user: req.user._id,
        content,
        platforms: parsedPlatforms,
        mediaUrl,
        mediaType,
        scheduledFor,
        status: status || 'scheduled',
    });

    return res.status(201).json(
        new ApiResponse(201, post, "Post scheduled successfully")
    );
});