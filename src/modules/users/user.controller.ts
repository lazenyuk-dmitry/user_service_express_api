import { Request, Response } from "express";
import { registerUser, loginUser } from "./user.service";

export async function register(req: Request, res: Response) {
  const user = await registerUser(req.body);
  res.status(201).json({ message: "User registered", userId: user.id });
}

export async function login(req: Request, res: Response) {
  const result = await loginUser(req.body);
  res.json(result);
}
