import express from "express";
import { deleteUser, followUser, getUser, unfollowUser, updateUser } from "../controller/user.js";

const router = express.Router();

// Update //
router.put("/:id",updateUser)

// Delete //

router.delete("/:id", deleteUser)

// Get User //
router.get("/:id", getUser)

// Follow User //
router.put("/:id/follow", followUser)

// Unfollow  User //
router.put("/:id/unfollow", unfollowUser)

// Get All 
// router.get("/:id",verifyAdmin, getUsers)




export default router;
