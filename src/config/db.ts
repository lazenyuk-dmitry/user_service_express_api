import { PrismaClient, Role, User } from "@prisma/client";

const prisma = new PrismaClient();
export { prisma, Role, User };
export default prisma;