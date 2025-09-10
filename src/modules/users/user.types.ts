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

export { Role };
