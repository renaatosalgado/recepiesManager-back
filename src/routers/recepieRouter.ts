import { Router } from "express";
import recepieController from "../controllers/recepieController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const recepieRouter = Router();

recepieRouter.get(
  "/recepies",
  validateTokenMiddleware,
  recepieController.listAll
);

recepieRouter.get(
  "/recepies/:recepieId",
  validateTokenMiddleware,
  recepieController.findSingleRecepie
);

export default recepieRouter;
