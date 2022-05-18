import { User } from "@prisma/client";
import ingredientRepository from "../repositories/ingredientRepository.js";
import measureRepository from "../repositories/measureRepository.js";
import recepieRepository from "../repositories/recepieRepository.js";
import { conflictError } from "../utils/errorUtils.js";

export interface SingleIngredient {
  quantity: string;
  measure: string;
  ingredient: string;
}

export interface RecepieInfo {
  servingPortion: number;
  method: string;
  picture: string;
  name: string;
}

async function listAll() {
  return await recepieRepository.listAll();
}

async function findSingleRecepie(recepieId: number) {
  return await recepieRepository.findById(recepieId);
}

async function createNewRecepie(
  ingredientsList: SingleIngredient[],
  recepieInfo: RecepieInfo,
  user: User
) {
  await filterIngredients(ingredientsList);
  await filterInfo(recepieInfo);

  const parsedRecepieName = normalizeString(recepieInfo.name);

  await recepieRepository.insertOne(
    parsedRecepieName,
    user.id,
    recepieInfo.picture,
    recepieInfo.servingPortion,
    recepieInfo.method
  );

  await addIngredients(ingredientsList, recepieInfo);
}

async function filterIngredients(ingredientsList: SingleIngredient[]) {
  ingredientsList.forEach(async (singleIngredient) => {
    const parsedMeasure = normalizeString(singleIngredient.measure);
    const measure = await measureRepository.findByName(parsedMeasure);
    if (!measure) {
      await measureRepository.insertOne(parsedMeasure);
    }

    const parsedIngredient = normalizeString(singleIngredient.ingredient);
    const ingredient = await ingredientRepository.findByName(parsedIngredient);
    if (!ingredient) {
      await ingredientRepository.insertOne(parsedIngredient);
    }
  });
}

async function filterInfo(recepieInfo: RecepieInfo) {
  const parsedRecepieName = normalizeString(recepieInfo.name);
  const recepie = await recepieRepository.findByName(parsedRecepieName);
  if (recepie)
    throw conflictError("Já existe uma receita cadastrada com esse nome!");
}

async function addIngredients(
  ingredientsList: SingleIngredient[],
  recepieInfo: RecepieInfo
) {
  const parsedRecepieName = normalizeString(recepieInfo.name);
  const recepie = await recepieRepository.findByName(parsedRecepieName);
  console.log({ recepie });

  ingredientsList.forEach(async (ingredient) => {
    const parsedIngredientName = normalizeString(ingredient.ingredient);
    const ingredientResult = await ingredientRepository.findByName(
      parsedIngredientName
    );
    console.log({ ingredientResult });

    const parsedMeasureName = normalizeString(ingredient.measure);
    const measuresResult = await measureRepository.findByName(
      parsedMeasureName
    );

    const parsedQuantity = normalizeQuantity(ingredient.quantity);
    console.log({ measuresResult });
    console.log({ parsedQuantity });

    await recepieRepository.insertIngredient(
      recepie.id,
      ingredientResult.id,
      measuresResult.id,
      parsedQuantity
    );
  });
}

function normalizeQuantity(quantity: string) {
  if (quantity.includes("/")) {
    const first = Number(quantity[0]);
    const second = Number(quantity[quantity.length - 1]);

    return first / second;
  }
  return Number(quantity);
}

function normalizeString(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

//"https://ricardometring.com/javascript-replace-special-characters";

export default {
  listAll,
  findSingleRecepie,
  createNewRecepie,
};
