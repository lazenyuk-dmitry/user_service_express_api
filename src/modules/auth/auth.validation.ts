import { ValidationError } from "@/utils/errors";
import { NextFunction, Request, Response } from "express";
import { Role } from "./auth.types";
import { z } from "zod";

const registerSchema = z.object({
  fullName: z.string().trim().min(5),
  birthDate: z.iso.date(),
  email: z.email(),
  password: z.string().min(6),
  isActive: z.boolean().optional(),
  role: z.enum(Role).optional(),
});

export async function validateRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    req.body = registerSchema.parse(req.body);
    next();
  } catch (err: any) {
    if(err instanceof z.ZodError) {
      throw new ValidationError(err);
    }

    throw err;
  }
}