import express from "express";
import * as ResumeController from "../controllers/resume.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/create", authenticate, ResumeController.createResume);
router.get("/my", authenticate, ResumeController.getUserResumes);
router.put("/:id", authenticate, ResumeController.updateResume);
router.delete("/:id", authenticate, ResumeController.deleteResume);

export default router;
