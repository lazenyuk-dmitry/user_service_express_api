import { Role } from "@/config/db";

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

export interface UserResponseDTO {
  id: number;
  fullName: string;
  birthDate: Date;
  email: string;
  role: Role;
  isActive: boolean;
}

export interface RegisterResponseDTO {
  user: UserResponseDTO;
  token: string;
}

export { Role };
