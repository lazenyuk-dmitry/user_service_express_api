import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// healthcheck
app.get("/", (req, res) => {
  res.json({ message: "User service is running 🚀" });
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`✅ DB connected, server running on http://localhost:${PORT}`);
  } catch (err) {
    console.error("❌ DB connection error:", err);
  }
});
