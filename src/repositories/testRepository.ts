import { prisma } from "../database.js";

async function resetUsers() {
  await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE`
}

export default {
  resetUsers,
};
