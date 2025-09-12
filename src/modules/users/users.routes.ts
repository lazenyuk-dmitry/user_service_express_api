import { Router } from "express";
import { getAll, getUser, blockUser, unblockUser } from "./users.controller";
import { userRoleMiddleware } from "@/middleware/userRoleMiddleware";
import { requireUserId } from "./users.validations";

const router = Router();

router.get("/", userRoleMiddleware("ADMIN"), getAll);
router.get("/:id", requireUserId, userRoleMiddleware("ADMIN", true), getUser);
router.patch("/:id/block", requireUserId, userRoleMiddleware("ADMIN", true), blockUser);
router.patch("/:id/unblock", requireUserId, userRoleMiddleware("ADMIN", true), unblockUser);

export default router;
