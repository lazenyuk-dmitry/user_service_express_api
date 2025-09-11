import { Request, Response } from "express";
import { registerUser, loginUser } from "./user.service";
import { LoginResponseDTO, RegisterResponseDTO } from "./user.types";
import { ApiResponse } from "@/types/api";
import { setAuthCookie } from "@/utils/cookie";

export async function register(req: Request, res: Response<ApiResponse<RegisterResponseDTO>>) {
  const registerData = await registerUser(req.body);

  setAuthCookie(res, registerData.token)

  res.status(201).json({
    status: 201,
    data: registerData,
    message: "User registered successfully",
  });
}

export async function login(req: Request, res: Response<ApiResponse<LoginResponseDTO>>) {
  const loginData = await loginUser(req.body);

  setAuthCookie(res, loginData.token)

  res.status(200).json({
    status: 200,
    data: loginData,
    message: "User login successfully",
  });
}
