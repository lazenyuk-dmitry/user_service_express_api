import { Request, Response, NextFunction } from "express";
import { ApiErrorResponse } from "@/types/api";
import { ApiError, ValidationError } from "@/utils/errors";

export function errorHandler(
  err: ApiErrorResponse,
  req: Request,
  res: Response<ApiErrorResponse>,
  next: NextFunction
) {
  console.error(err);

  if (err instanceof ApiError) {
    res.status(err.status || 400).json({
      status: err.status || 400,
      message: err.message || "Internal Server Error",
      details: err.details || null,
    });
  }

  if (process.env.NODE_ENV === 'development') {
    throw err;
  }

  next()
}