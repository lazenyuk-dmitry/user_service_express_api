import { Router } from "express";
import { getAll, getUser, blockUser, unblockUser } from "./users.controller";
import { userRoleMiddleware } from "@/middleware/userRoleMiddleware";

const router = Router();

router.get("/", userRoleMiddleware("ADMIN"), getAll);
router.get("/:id", userRoleMiddleware("ADMIN", true), getUser);
router.patch("/:id/block", userRoleMiddleware("ADMIN", true), blockUser);
router.patch("/:id/unblock", userRoleMiddleware("ADMIN", true), unblockUser);

export default router;
