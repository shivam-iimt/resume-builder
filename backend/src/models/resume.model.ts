import { Schema, model, Document, Types } from "mongoose";

export interface IResume extends Document {
  user: Types.ObjectId;
  title: string;
  summary?: string;
  experience?: Array<{
    role: string;
    company: string;
    duration?: string;
    description?: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    year?: string;
  }>;
  skills?: string[];
  projects?: Array<{
    name: string;
    description?: string;
    link?: string;
  }>;
  theme?: string; // for UI customization
  aiVersion?: number; // AI draft versioning
  createdAt: Date;
  updatedAt: Date;
}

const resumeSchema = new Schema<IResume>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    summary: { type: String },
    experience: [
      {
        role: String,
        company: String,
        duration: String,
        description: String,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        year: String,
      },
    ],
    skills: [String],
    projects: [
      {
        name: String,
        description: String,
        link: String,
      },
    ],
    theme: { type: String, default: "default" },
    aiVersion: { type: Number, default: 1 },
  },
  { timestamps: true }
);

export const Resume = model<IResume>("Resume", resumeSchema);
