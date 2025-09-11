import { Role } from "@/config/db";
import { PublicUser } from "@/modules/users/users.types";

export interface RegisterDTO {
  fullName: string;
  birthDate: string;
  email: string;
  password: string;
  role?: Role;
  isActive?: boolean;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterResponseDTO {
  user: PublicUser;
  token: string;
}

export interface LoginResponseDTO {
  user: PublicUser;
  token: string;
}

export { Role };
