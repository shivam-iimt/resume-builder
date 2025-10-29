import { Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import * as ResumeService from "../services/resume.service";
import { Types } from "mongoose";

export const createResume = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const resume = await ResumeService.createResume({
      ...req.body,
      user: new Types.ObjectId(userId),
    });
    res.status(201).json({ message: "Resume created successfully", resume });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getUserResumes = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const resumes = await ResumeService.getUserResumes(userId);
    res.status(200).json(resumes);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const updateResume = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await ResumeService.updateResume(id, req.body);
    if (!updated) return res.status(404).json({ message: "Resume not found" });
    res.status(200).json({ message: "Resume updated successfully", updated });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const deleteResume = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await ResumeService.deleteResume(id);
    if (!deleted) return res.status(404).json({ message: "Resume not found" });
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Server error" });
  }
};
