import bcrypt from "bcrypt";

const SALT = parseInt(process.env.SALT_ROUNDS || "10", 10);

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT);
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
