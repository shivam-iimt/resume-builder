import { Types } from "mongoose";
import logger from "../utils/logger";
import { IResume, Resume } from "../models/resume.model";

export const createResume = async (data: Partial<IResume>) => {
  try {
    const resume = new Resume(data);
    return await resume.save();
  } catch (err) {
    logger.error("Resume creation failed", err);
    throw new Error("Failed to create resume");
  }
};

export const getUserResumes = async (userId: string) => {
  return Resume.find({ user: new Types.ObjectId(userId) }).sort({
    updatedAt: -1,
  });
};

export const updateResume = async (
  resumeId: string,
  data: Partial<IResume>
) => {
  return Resume.findByIdAndUpdate(resumeId, data, { new: true });
};

export const deleteResume = async (resumeId: string) => {
  return Resume.findByIdAndDelete(resumeId);
};
