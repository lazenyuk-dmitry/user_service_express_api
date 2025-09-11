import { Router } from "express";
import { register, login } from "./auth.controller";
import { validateRegister } from "./auth.validation";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", login);

export default router;
