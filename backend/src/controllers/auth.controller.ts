import type { Request, Response, NextFunction } from "express";
import { User } from "../models/user";
import { hash, verify } from "argon2";
import {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} from "../utils/token";
import { sanitize } from "../utils/sanitize";
const COOKIE_NAME = "jid";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = sanitize(req.body);
    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing fields" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await hash(password);
    const user = await User.create({
      name,
      email,
      password: hashed,
      refreshTokens: [],
    });

    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);
    user.refreshTokens.push(refreshToken);
    if (user.refreshTokens.length > 10)
      user.refreshTokens = user.refreshTokens.slice(-10);
    await user.save();

    res.cookie(COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({
        accessToken,
        user: { id: user.id, email: user.email, name: user.name },
      });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = sanitize(req.body);
    if (!email || !password)
      return res.status(400).json({ message: "Missing fields" });
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Account lockout check
    if (user.lockUntil && user.lockUntil > new Date()) {
      return res.status(403).json({ message: "Account locked. Try later." });
    }

    const valid = await verify(user.password, password);
    if (!valid) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 minutes
      }
      await user.save();
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Reset failures
    user.failedLoginAttempts = 0;
    user.lockUntil = null as any;
    const accessToken = signAccessToken(user.id);
    const refreshToken = signRefreshToken(user.id);

    user.refreshTokens.push(refreshToken);
    if (user.refreshTokens.length > 10)
      user.refreshTokens = user.refreshTokens.slice(-10);
    await user.save();

    res.cookie(COOKIE_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      accessToken,
      user: { id: user.id, email: user.email, name: user.name },
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (token) {
      const user = await User.findOne({ refreshTokens: token });
      if (user) {
        user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
        await user.save();
      }
    }
    res.clearCookie(COOKIE_NAME, { path: "/api/auth/refresh" });
    res.json({ message: "Logged out" });
  } catch (err) {
    next(err);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies[COOKIE_NAME];
    if (!token) return res.status(401).json({ message: "No refresh token" });

    let payload: any;
    try {
      payload = verifyRefreshToken(token);
    } catch (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const user = await User.findById(payload.userId);
    if (!user || !user.refreshTokens.includes(token)) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    // rotate refresh token
    user.refreshTokens = user.refreshTokens.filter((t) => t !== token);
    const newRefresh = signRefreshToken(user.id);
    user.refreshTokens.push(newRefresh);
    if (user.refreshTokens.length > 10)
      user.refreshTokens = user.refreshTokens.slice(-10);
    await user.save();

    const accessToken = signAccessToken(user.id);
    res.cookie(COOKIE_NAME, newRefresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      path: "/api/auth/refresh",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const me = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Expect middleware to set req.userId if using access token middleware
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });
    const payload: any = require("../utils/token").verifyAccessToken(token);
    const user = await User.findById(payload.userId).select(
      "-password -refreshTokens"
    );
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};
