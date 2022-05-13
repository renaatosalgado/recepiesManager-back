import { Request, Response } from "express";
import recepieService from "../services/recepieService.js";

async function listAll(req: Request, res: Response) {
  const recepies = await recepieService.listAll();

  res.status(200).send(recepies);
}

export default {
  listAll,
};
