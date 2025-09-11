import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import authRoutes from "@/modules/auth/auth.routes";
import usersRoutes from "@/modules/users/users.routes";
import { errorHandler } from "@/middleware/errorHandler";
import { authMiddleware } from "./middleware/authMiddleware";

dotenv.config();

const PORT = process.env.PORT || 3000;
const API_BASE_URL = process.env.API_BASE_URL || "/api";

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.use(API_BASE_URL, (router => {
  router.use("/auth", authRoutes);
  router.use("/users", authMiddleware, usersRoutes);
  return router;
})(express.Router()));
app.use(errorHandler);

// healthcheck
app.get("/", (req, res) => {
  res.json({ message: "User service is running 🚀" });
});

// start server
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`✅ DB connected, server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
});
