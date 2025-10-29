import type { ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ body: req.body, params: req.params, query: req.query });
      next();
    } catch (e: any) {
      return res.status(400).json({ error: e.errors || e.message });
    }
  };
