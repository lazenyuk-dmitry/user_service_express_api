import prisma from "@/config/db";
import { RegisterDTO, LoginDTO, Role, RegisterResponseDTO, LoginResponseDTO } from "./auth.types";
import { comparePasswords, hashPassword } from "@/utils/hash";
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
  const { email, password } = data;

  if (!email || !password) throw new ApiError({
    status: 400,
    message: "Wrong email or password",
  });

  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) throw new ApiError({
    status: 400,
    message: "Wrong email or password",
  });

  const { password: hashPassword, ...publicUser } = user;
  const valid = await comparePasswords(password, hashPassword);

  if (!valid) throw new ApiError({
    status: 400,
    message: "Wrong email or password",
  });

  const token = generateToken(publicUser);

  return {
    user: publicUser,
    token,
  };
}
