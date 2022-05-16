import { Request, Response } from "express";
import recepieService from "../services/recepieService.js";

async function listAll(req: Request, res: Response) {
  const recepies = await recepieService.listAll();

  res.status(200).send(recepies);
}

async function findSingleRecepie(req: Request, res: Response) {
  const { recepieId } = req.params;

  const recepie = await recepieService.findSingleRecepie(Number(recepieId));

  res.status(200).send(recepie);
}
export default {
  listAll,
  findSingleRecepie,
};
