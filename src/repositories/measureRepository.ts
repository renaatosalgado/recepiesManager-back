import { prisma } from "../database.js";

async function findByName(name: string) {
  return await prisma.measure.findUnique({
    where: {
      name: name,
    },
  });
}

async function insertOne(name: string) {
  await prisma.measure.upsert({
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
