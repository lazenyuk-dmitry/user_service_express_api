import { Router } from "express";
import { register, login } from "./user.controller";
import { validateRegister } from "./user.validation";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", login);

export default router;
