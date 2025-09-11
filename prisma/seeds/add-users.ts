import bcrypt from "bcrypt";
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  const salt = parseInt(process.env.SALT_ROUNDS || '10', 10);
  const userPassword = await bcrypt.hash("123456789", salt);
  const adminPassword = await bcrypt.hash("123456789", salt);

  await prisma.user.createMany({
    data: [
      {
        fullName: 'Admin User',
        birthDate: new Date("1990-01-01"),
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN',
        isActive: true,
      },
      {
        fullName: 'Test User',
        birthDate: new Date("1995-08-08"),
        email: 'user@example.com',
        password: userPassword,
        role: 'USER',
        isActive: true,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => console.log('Seeding complete'))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });