import prisma from "@/config/db";
import { RegisterDTO, LoginDTO, Role, RegisterResponseDTO, LoginResponseDTO } from "./user.types";
import { hashPassword, comparePasswords } from "@/utils/hash";
import { generateToken } from "@/utils/jwt";
import { ApiError } from "@/utils/errors";

export async function registerUser(data: RegisterDTO): Promise<RegisterResponseDTO> {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) throw new ApiError({
    status: 400,
    message: "Email already in use",
  });

  const hashed = await hashPassword(data.password);

  const user = await prisma.user.create({
    data: {
      fullName: data.fullName,
      birthDate: new Date(data.birthDate),
      email: data.email,
      password: hashed,
      role: Role.USER,
      isActive: data.isActive
    },
  });

  const token = generateToken(user);

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      birthDate: user.birthDate,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
    token,
  };
}

export async function loginUser(data: LoginDTO): Promise<LoginResponseDTO> {
  const user = await prisma.user.findUnique({ where: { email: data.email } });
  if (!user) throw new ApiError({
    status: 400,
    message: "Wrong email or password",
  });

  const valid = await comparePasswords(data.password, user.password);
  if (!valid) throw new ApiError({
    status: 400,
    message: "Wrong email or password",
  });

  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  return {
    user: {
      id: user.id,
      fullName: user.fullName,
      birthDate: user.birthDate,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
    },
    token,
  };
}
