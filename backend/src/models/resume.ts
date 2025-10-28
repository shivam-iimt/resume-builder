import { Schema, model, Types } from "mongoose";

interface IResume {
  userId: Types.ObjectId;
  data: any;
  publicSlug: string;
}

const resumeSchema = new Schema<IResume>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    data: { type: Object, required: true },
    publicSlug: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const Resume = model<IResume>("Resume", resumeSchema);
