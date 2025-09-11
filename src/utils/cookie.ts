import { CookieOptions, Response } from "express";

export function setAuthCookie(
  res: Response,
  token: string,
  options?: CookieOptions
) {
  res.cookie("token", token, {
    httpOnly: true,
    secure: options?.secure ?? process.env.NODE_ENV === "production",
    maxAge: options?.maxAge ?? 1000 * 60 * 60, // 1 час по умолчанию
    sameSite: options?.sameSite ?? "lax",
  });
}