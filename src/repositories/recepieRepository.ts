import { prisma } from "../database.js";

async function listAll() {
  return await prisma.recepie.findMany();
}

async function findById(recepieId: number) {
  return await prisma.recepie.findUnique({
    where: {
      id: recepieId,
    },
    include: {
      ingredientsRecepies: {
        include: {
          ingredient: true,
          measure: true,
        },
      },
    },
  });
}

export default {
  listAll,
  findById,
};
