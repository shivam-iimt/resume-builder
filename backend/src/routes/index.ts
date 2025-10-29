// src/routes/index.ts
import { Router } from "express";
import authRoutes from "./auth.routes";
import resumeRoutes from "./resume.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/resume", resumeRoutes);

export default router;
