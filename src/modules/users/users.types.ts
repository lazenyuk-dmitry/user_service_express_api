import { Role, User } from "@/config/db";

export type PublicUser = Omit<User, "password">;

export interface UpdateUserDTO {
  isActive?: boolean,
  role?: Role,
}

export { Role };
