import { Request, Response, NextFunction } from "express";
import { ApiErrorResponse } from "@/types/api";

export function errorHandler(
  err: ApiErrorResponse,
  req: Request,
  res: Response<ApiErrorResponse>,
  next: NextFunction
) {
  console.error(err);
  res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "Internal Server Error",
    details: err.details || null,
  });
}