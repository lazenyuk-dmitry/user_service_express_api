import { ValidationError } from "@/utils/errors";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const validateId = z.coerce.number().min(1);

export async function requireUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    validateId.parse(req.params.id);
    next();
  } catch (err: any) {
    if(err instanceof z.ZodError) {
      throw new ValidationError(err, "Invalid user ID");
    }

    throw err;
  }
}