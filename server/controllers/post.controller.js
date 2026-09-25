import { GoogleGenAI } from "@google/genai";
import axios from "axios";
import uploadOnCloudinary from "../db/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { Generation } from "../models/generation.model.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Replicate from "replicate";
import { upload } from "../middlewares/multer.middleware.js";

const replicate = new Replicate();



export const generatePost = asyncHandler(async (req, res) => {
  const { prompt, tone, generateImage } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new ApiError(
      400,
      "Gemini API Key is missing. Please add it to your server/.env file."
    );
  }

  if (!prompt) {
    throw new ApiError(400, "Prompt is required.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: `Generate a social media post based on this prompt: "${prompt}".
        Tone: ${tone}.
        Include relevant hashtags.
        Format the response as JSON with "content" and "imagePrompt" fields.
        The "imagePrompt" should be a highly descriptive prompt for an image generator that complements the post.`,
  });

  let content = "";
  let imagePrompt = prompt;

  try {
    const rawText = response.text || "";
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    const data = jsonMatch
      ? JSON.parse(jsonMatch[0])
      : { content: rawText, imagePrompt: prompt };
    content = data.content;
    imagePrompt = data.imagePrompt;
  } catch (e) {
    content = response.text || "";
  }

  let mediaUrl = "";

  if (generateImage) {
    const replicateToken = process.env.REPLICATE_API_TOKEN;
    if (!replicateToken) {
      throw new ApiError(
        400,
        "Replicate API Token is missing. Please add it to your server/.env file."
      );
    }

    const output = await replicate.run("black-forest-labs/flux-schnell", {
      input: {
        prompt: imagePrompt || prompt,
        go_fast: true,
      },
    });

    cloudinary.config({
      cloud_name: String(process.env.CLOUDINARY_CLOUD_NAME).trim(),
      api_key: String(process.env.CLOUDINARY_API_KEY).trim(),
      api_secret: String(process.env.CLOUDINARY_API_SECRET).trim(),
      secure: true,
    });

    const rawOutput = Array.isArray(output) ? output[0] : output;
    const urlObj =
      typeof rawOutput.url === "function" ? rawOutput.url() : String(rawOutput);
    const tempUrl = urlObj.href ? urlObj.href : urlObj.toString();

    const uploadResult = await cloudinary.uploader.upload(tempUrl, {
      folder: "ai-generations",
    });

    mediaUrl = uploadResult.secure_url;
  }

  const generation = await Generation.create({
    user: req.user._id,
    prompt,
    content,
    mediaUrl,
    mediaType: mediaUrl ? "image" : undefined,
    tone,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, generation, "Post generated successfully"));
});




export const getGenerations = asyncHandler(async (req, res) => {
  const generations = await Generation.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, generations, "Generations fetched successfully")
    );
});




export const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});




// Schedule post
// POST /api/posts
export const schedulePost = asyncHandler(async (req, res) => {
  let rawPlatforms = req.body.platforms || req.body.platform;

  let parsedPlatforms = rawPlatforms;
  if (typeof rawPlatforms === "string") {
    try {
      parsedPlatforms = JSON.parse(rawPlatforms).map((p) =>
        typeof p === "string" ? p : p.name
      );
    } catch (e) {
      parsedPlatforms = rawPlatforms.split(",");
    }
  }
  if (!Array.isArray(parsedPlatforms) && parsedPlatforms) {
    parsedPlatforms = [parsedPlatforms];
  }

  const { content, scheduledFor, status } = req.body;

  let mediaUrl = req.body.mediaUrl;
  let mediaType = req.body.mediaType;

  if (req.file) {
    const uploadResult = await uploadOnCloudinary(req.file.path);

    if (!uploadResult) {
      throw new ApiError(500, "Failed to upload media file to Cloudinary");
    }

    mediaUrl = uploadResult.secure_url;
    mediaType = uploadResult.resource_type === "video" ? "video" : "image";
  }

  const post = await Post.create({
    user: req.user._id,
    content,
    platforms: parsedPlatforms,
    mediaUrl,
    mediaType,
    scheduledFor,
    status: status || "scheduled",
  });

  return res
    .status(201)
    .json(new ApiResponse(201, post, "Post scheduled successfully"));
});
