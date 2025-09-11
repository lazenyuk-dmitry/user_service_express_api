import { PublicUser } from "@/modules/users/users.types";
import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    user?: PublicUser;
  }
}