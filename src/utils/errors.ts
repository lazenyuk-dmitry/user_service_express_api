import { ApiErrorResponse } from "@/types/api";

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