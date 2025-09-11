import { Router } from "express";
import { getAll, getUser, blockUser, unblockUser } from "./users.controller";

const router = Router();

router.get("/", getAll);
router.get("/:id", getUser);
router.patch("/:id/block", blockUser);
router.patch("/:id/unblock", unblockUser);

export default router;
