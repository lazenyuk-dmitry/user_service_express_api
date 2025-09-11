import prisma from "@/config/db";
import { RegisterDTO, LoginDTO, Role, RegisterResponseDTO, LoginResponseDTO } from "./auth.types";
import { comparePasswords } from "@/utils/hash";
import { generateToken } from "@/utils/jwt";
import { ApiError } from "@/utils/errors";
import { addUser } from "@/modules/users/users.service";

export async function registerUser(data: RegisterDTO): Promise<RegisterResponseDTO> {
  const user = await addUser(data)
  const token = generateToken(user);

  return {
    user,
    token,
  };
}

export async function loginUser(data: LoginDTO): Promise<LoginResponseDTO> {
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) throw new ApiError({
    status: 400,
    message: "Wrong email or password",
  });

  const { password, ...publicUser } = user;
  const valid = await comparePasswords(data.password, password);

  if (!valid) throw new ApiError({
    status: 400,
    message: "Wrong email or password",
  });

  const token = generateToken({ id: user.id, email: user.email, role: user.role });

  return {
    user: publicUser,
    token,
  };
}
