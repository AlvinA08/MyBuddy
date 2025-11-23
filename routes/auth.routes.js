import express from "express";
import authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../config/auth.config.js";

const router = express.Router();

router.post("/register", authController.register.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/me", authMiddleware, authController.getMe.bind(authController));

export default router;
