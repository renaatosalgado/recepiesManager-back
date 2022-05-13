import { prisma } from "../database.js";

async function listAll() {
  return await prisma.recepie.findMany();
}

export default {
  listAll,
};
