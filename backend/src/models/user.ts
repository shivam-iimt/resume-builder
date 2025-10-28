import { Schema, model } from "mongoose";

interface IUser {
  email: string;
  password: string;
  name: string;
  refreshTokens: string[];
  failedLoginAttempts: number;
  lockUntil?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    refreshTokens: [{ type: String }],
    failedLoginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
