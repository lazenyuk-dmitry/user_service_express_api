import prisma from "@/config/db";
import { Role, PublicUser, UpdateUserDTO } from "./users.types";
import { hashPassword } from "@/utils/hash";
import { ApiError } from "@/utils/errors";
import { RegisterDTO } from "@/modules/auth/auth.types";

const publicUserFields = {
  id: true,
  fullName: true,
  birthDate: true,
  email: true,
  role: true,
  isActive: true,
}

export async function addUser(data: RegisterDTO): Promise<PublicUser> {
  const existing = await prisma.user.findUnique({
    where: { email: data.email },
    select: publicUserFields,
  });

  if (existing) throw new ApiError({
    status: 400,
    message: "Email already in use",
  });

  const passwordHash = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      birthDate: new Date(data.birthDate),
      email: data.email,
      password: passwordHash,
      role: data.role ?? Role.USER,
      isActive: data.isActive ?? true
    },
    select: publicUserFields
  },);

  return user;
}

export async function getUserById(id: number): Promise<PublicUser> {
  const user = await prisma.user.findUnique({
    where: { id: id },
    select: publicUserFields,
  });

  if (!user) throw new ApiError({
    status: 400,
    message: "User not found",
  });

  return user;
}

export async function getUserByEmail(email: string): Promise<PublicUser> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: publicUserFields,
  });

  if (!user) throw new ApiError({
    status: 400,
    message: "User not found",
  });

  return user;
}

export async function getAllUsers(): Promise<PublicUser[]> {
  const usersList = await prisma.user.findMany({
    where: { isActive: true, role: "ADMIN" },
    select: publicUserFields,
  });

  return usersList;
}

export async function updateUser(id: number, data: UpdateUserDTO): Promise<PublicUser> {
  const updatedUser = await prisma.user.update({
    where: { id },
    data: { isActive: data.isActive, role: data.role },
    select: publicUserFields
  });

  return updatedUser;
}
