// src/controllers/ai.controller.ts
import { Request, Response } from "express";
import { generateText } from "../services/ai.service";

export const generateResumeSection = async (req: Request, res: Response) => {
  const { role, experience, tone } = req.body;
  try {
    const prompt = `Write 5 bullet points for a ${role} with ${experience} in a ${tone} tone...`; // iterate
    const text = await generateText(prompt);
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: "AI generation failed" });
  }
};
