// src/utils/response.ts
import { Response } from "express";

export function successResponse(res: Response, message: string, data?: any) {
  return res.status(200).json({
    success: true,
    message,
    data: data || null,
  });
}

export function errorResponse(res: Response, message: string, status = 400) {
  return res.status(status).json({
    success: false,
    message,
  });
}
