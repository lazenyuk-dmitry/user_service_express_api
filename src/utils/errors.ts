import { ApiErrorResponse } from "@/types/api";
import z from "zod";

const DEFAULT_ERROR = {
  status: 400,
  message: "Server error",
  details: null,
};

export class ApiError extends Error {
  status: number;
  details?: any;

  constructor(error: ApiErrorResponse = DEFAULT_ERROR) {
    super(error.message);
    this.status = error.status;
    this.details = error.details;

    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

export class ValidationError extends ApiError {
  constructor(err: z.ZodError, message = "Validation error", status = 400) {
    super({
      status,
      message,
      details: err.issues.map((e: any) => ({ field: e.path[0], message: e.message })),
    });

    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}