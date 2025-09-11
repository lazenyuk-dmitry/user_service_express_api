import { Request, Response } from "express";
import { ApiResponse } from "@/types/api";
import { getAllUsers, getUserById, updateUser } from "@/modules/users/users.service"
import { PublicUser } from "./users.types";

export async function getAll(req: Request, res: Response<ApiResponse<PublicUser[]>>) {
  const users = await getAllUsers()

  res.status(200).json({
    status: 200,
    data: users,
    message: "Success",
  });
}

export async function getUser(req: Request, res: Response<ApiResponse<PublicUser>>) {
  const id = Number(req.params.id)
  const user = await getUserById(id)

  res.status(200).json({
    status: 200,
    data: user,
    message: "Success",
  });
}

export async function blockUser(req: Request, res: Response<ApiResponse<PublicUser>>) {
  const id = Number(req.params.id)
  const user = await updateUser(id, { isActive: false });

  res.status(200).json({
    status: 200,
    data: user,
    message: "User blocked",
  });
}

export async function unblockUser(req: Request, res: Response<ApiResponse<PublicUser>>) {
  const id = Number(req.params.id)
  const user = await updateUser(id, { isActive: true });

  res.status(200).json({
    status: 200,
    data: user,
    message: "User unblocked",
  });
}
