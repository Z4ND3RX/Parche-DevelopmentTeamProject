import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();
export const PORT = process.env.PORT || 3000