import { Request, Response } from "express";
import { Resume } from "../models/resume";
import { sanitize  } from "../utils/sanitize";
import { nanoid } from "nanoid";

export const saveResume = async (req: any, res: Response) => {
  const data = sanitize (req.body);
  let resume = await Resume.findOne({ userId: req.userId });
  if (resume) {
    resume.data = data;
    await resume.save();
  } else {
    const slug = nanoid(10);
    resume = await Resume.create({
      userId: req.userId,
      data,
      publicSlug: slug,
    });
  }
  res.json(resume);
};

export const getResume = async (req: any, res: Response) => {
  const resume = await Resume.findOne({ userId: req.userId });
  if (!resume) return res.status(404).json({ message: "Resume not found" });
  res.json(resume);
};

export const getPublicResume = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const resume = await Resume.findOne({ publicSlug: slug });
  if (!resume) return res.status(404).json({ message: "Resume not found" });
  res.json(resume);
};
