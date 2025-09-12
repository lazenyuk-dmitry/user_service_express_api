import { Role } from "@/modules/users/users.types";
import { ApiError } from "@/utils/errors";
import { Request, Response, NextFunction } from "express";

export function userRoleMiddleware(role: Role, orSelf = false) {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const currentUser = req.user;
    const userId = Number(req.params.id);

    if (!currentUser) {
      throw new ApiError({
        status: 401,
        message: "Unauthorized",
      });
    }

    if (currentUser.role === role || (orSelf && currentUser.id === userId)) {
      next();
    } else {
      throw new ApiError({
        status: 403,
        message: "Forbidden",
      });
    }
  }
};