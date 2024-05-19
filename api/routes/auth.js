import express from "express";
import { login, register } from "../controller/auth.js";
const router = express.Router();

// Register 
router.post("/register", register)

// Login
router.post("/login", login)


export default router;