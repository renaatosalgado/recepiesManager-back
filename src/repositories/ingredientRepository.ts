import { prisma } from "../database.js";

async function findByName(name: string) {
  return await prisma.ingredient.findUnique({
    where: {
      name: name,
    },
  });
}

async function insertOne(name: string) {
  await prisma.ingredient.upsert({
    where: {
      name,
    },
    update: {},
    create: {
      name,
    },
  });
}

export default {
  findByName,
  insertOne,
};
