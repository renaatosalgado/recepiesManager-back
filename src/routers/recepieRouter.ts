import { Router } from "express";
import recepieController from "../controllers/recepieController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const recepieRouter = Router();

recepieRouter.get(
  "/recepies",
  validateTokenMiddleware,
  recepieController.listAll
);

export default recepieRouter;
