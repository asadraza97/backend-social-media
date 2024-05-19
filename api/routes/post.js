import express from "express";
import { createPost, deletePost, getPost, likePost, timelinePost, updatePost } from "../controller/post.js";


const router = express.Router();

// Create Post 
router.post("/", createPost)

// Update Post 
router.put("/:id",updatePost)

// Delete Post 
router.delete("/:id",deletePost)

// like, dislike Post 
router.put("/:id/like",likePost)

// Get Post 
router.get("/:id",getPost)

// get timeline Posts 
router.get("/timeline/all", timelinePost)



export default router;
