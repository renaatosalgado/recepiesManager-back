import { User } from "@prisma/client";
import { Request, Response } from "express";
import recepieService, {
  RecepieInfo,
  SingleIngredient,
} from "../services/recepieService.js";

async function listAll(req: Request, res: Response) {
  const recepies = await recepieService.listAll();

  res.status(200).send(recepies);
}

async function findSingleRecepie(req: Request, res: Response) {
  const { recepieId } = req.params;

  const recepie = await recepieService.findSingleRecepie(Number(recepieId));

  res.status(200).send(recepie);
}

async function addNewRecepie(req: Request, res: Response) {
  const user: User = res.locals.user;
  const ingredientsList: SingleIngredient[] = req.body.ingredients;
  const recepieInfo: RecepieInfo = req.body.info;

  await recepieService.createNewRecepie(ingredientsList, recepieInfo, user);

  res.sendStatus(201);
}

async function deleteRecepie(req: Request, res: Response) {
  const { recepieId } = req.params;

  await recepieService.deleteRecepie(Number(recepieId));

  res.sendStatus(200);
}

async function listAllIngredients(req: Request, res: Response) {
  const { ids } = req.query;
  const numberedIdsArr = ids
    .toString()
    .split(",")
    .map((id) => {
      return Number(id);
    });

  const allRecepies = await recepieService.getIngredientsList(numberedIdsArr);

  res.status(200).send(allRecepies);
}

export default {
  listAll,
  findSingleRecepie,
  addNewRecepie,
  deleteRecepie,
  listAllIngredients,
};
