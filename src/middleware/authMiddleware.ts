import { PublicUser } from "@/modules/users/users.types";
import { ApiError } from "@/utils/errors";
import { verifyToken } from "@/utils/jwt";
import { Request, Response, NextFunction } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError({
      status: 401,
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = verifyToken<PublicUser>(token)
    req.user = payload;
    next();
  } catch {
    throw new ApiError({
      status: 401,
      message: "Invalid token",
    });
  }
};