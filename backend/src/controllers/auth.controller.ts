import { Request, Response } from "express";
import * as AuthService from "../services/auth.service";
import logger from "../utils/logger";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    const data = await AuthService.registerUser(email, password, name);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data,
    });
  } catch (error: any) {
    logger.error("Register Controller Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const data = await AuthService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: "Login successful",
      data,
    });
  } catch (error: any) {
    logger.error("Login Controller Error:", error.message);
    res.status(401).json({ success: false, message: error.message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const data = await AuthService.refreshAccessToken(userId);
    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data,
    });
  } catch (error: any) {
    logger.error("Refresh Controller Error:", error.message);
    res.status(400).json({ success: false, message: error.message });
  }
};
