import { Router } from "express";
import { signup, login, logout } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { z } from "zod";
import { authRateLimiter } from "../middlewares/rateLimit.middleware";

const router = Router();

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
});
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/signup", authRateLimiter, validate(signupSchema), signup);
router.post("/login", authRateLimiter, validate(loginSchema), login);
router.post("/logout", logout);

export default router;
