import type { Request, Response } from "express";
import { User } from "../models/user";
import { hash, verify } from "argon2";
import { signAccessToken, signRefreshToken } from "../utils/token";
import { sanitizeInput } from "../utils/sanitize";

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = sanitizeInput(req.body);
  const existing = await User.findOne({ email });
  if (existing)
    return res.status(400).json({ message: "Email already exists" });

  const hashed = await hash(password);
  const user = await User.create({
    email,
    password: hashed,
    name,
    refreshTokens: [],
  });

  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);
  user.refreshTokens.push(refreshToken);
  await user.save();

  res.cookie("jid", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/refresh",
  });
  res.json({ accessToken, user: { email, name, id: user.id } });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = sanitizeInput(req.body);
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  // Lockout check
  if (user.lockUntil && user.lockUntil > new Date())
    return res.status(403).json({ message: "Account locked. Try later." });

  const valid = await verify(user.password, password);
  if (!valid) {
    user.failedLoginAttempts += 1;
    if (user.failedLoginAttempts >= 5)
      user.lockUntil = new Date(Date.now() + 30 * 60 * 1000); // 30 min lock
    await user.save();
    return res.status(400).json({ message: "Invalid credentials" });
  }

  user.failedLoginAttempts = 0;
  // user.lockUntil = null;
  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);
  user.refreshTokens.push(refreshToken);
  await user.save();

  res.cookie("jid", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/api/auth/refresh",
  });
  res.json({ accessToken, user: { email, name, id: user.id } });
};

export const logout = async (req: Request, res: Response) => {
  const token = req.cookies.jid;
  if (token) {
    const user = await User.findOne({ refreshTokens: token });
    if (user) {
      user.refreshTokens = user.refreshTokens.filter((t:any) => t !== token);
      await user.save();
    }
  }
  res.clearCookie("jid", { path: "/api/auth/refresh" });
  res.json({ message: "Logged out" });
};
