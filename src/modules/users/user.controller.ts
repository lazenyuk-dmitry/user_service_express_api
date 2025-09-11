import { Request, Response } from "express";
import { registerUser, loginUser } from "./user.service";
import { RegisterResponseDTO } from "./user.types";
import { ApiResponse } from "@/types/api";

export async function register(req: Request, res: Response<ApiResponse<RegisterResponseDTO>>) {
  const registerData = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    data: registerData,
    message: "User registered successfully",
  });
}

export async function login(req: Request, res: Response) {
  const result = await loginUser(req.body);
  res.json(result);
}
