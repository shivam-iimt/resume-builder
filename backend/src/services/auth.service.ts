import bcrypt from "bcryptjs";
import { generateTokens } from "../utils/token";
import logger from "../utils/logger";
import { User } from "../models/user.model";

export const registerUser = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashedPassword, name });

    const { accessToken, refreshToken } = generateTokens(String(user._id));

    return { user, accessToken, refreshToken };
  } catch (error: any) {
    logger.error("Register Error:", error.message);
    throw new Error(error.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid email or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid email or password");

    const { accessToken, refreshToken } = generateTokens(String(user._id));

    return { user, accessToken, refreshToken };
  } catch (error: any) {
    logger.error("Login Error:", error.message);
    throw new Error(error.message);
  }
};

export const refreshAccessToken = async (userId: string) => {
  try {
    const { accessToken, refreshToken } = generateTokens(userId);
    return { accessToken, refreshToken };
  } catch (error: any) {
    logger.error("Refresh Token Error:", error.message);
    throw new Error("Failed to refresh token");
  }
};
