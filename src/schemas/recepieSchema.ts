import joi from "joi";
import { RecepieInfo, SingleIngredient } from "../services/recepieService";

const singleIngredient = joi.object<SingleIngredient>({
  quantity: joi.string().required(),
  measure: joi.string().required(),
  ingredient: joi.string().required(),
});

const recepieInfo = joi.object<RecepieInfo>({
  picture: joi.string().pattern(/(https?:\/\/.*\.(?:png|jpg))/i).required(),
  servingPortion: joi.number().required(),
  name: joi.string().required(),
  method: joi.string().required(),
});

const ingredientsList = joi.array().items(singleIngredient);

export const recepieSchema = joi.object({
  ingredients: ingredientsList,
  info: recepieInfo,
});
