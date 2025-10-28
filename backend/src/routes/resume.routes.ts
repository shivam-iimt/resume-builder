import { Router } from "express";
import {
  saveResume,
  getResume,
  getPublicResume,
} from "../controllers/resume.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { exportResumePDF } from "../controllers/pdfController";

const router = Router();

router.get("/", authenticate, getResume);
router.post("/", authenticate, saveResume);
router.get("/public/:slug", getPublicResume);
router.get("/export/:id", authenticate, exportResumePDF);


export default router;
