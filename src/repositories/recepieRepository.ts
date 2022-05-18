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

async function findByName(name: string) {
  return await prisma.recepie.findUnique({
    where: {
      name: name,
    },
  });
}

async function insertOne(
  name: string,
  userId: number,
  picture: string,
  servingPortion: number,
  method: string
) {
  await prisma.recepie.create({
    data: {
      name,
      userId,
      picture,
      servingPortion,
      method,
    },
  });
}

async function insertIngredient(
  recepieId: number,
  ingredientId: number,
  measureId: number,
  quantity: number
) {
  await prisma.ingredientRecepie.create({
    data: {
      recepieId,
      ingredientId,
      measureId,
      quantity,
    },
  });
}

export default {
  listAll,
  findById,
  findByName,
  insertOne,
  insertIngredient,
};
