import { Router } from "express";
import recepieController from "../controllers/recepieController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { recepieSchema } from "../schemas/recepieSchema.js";

const recepieRouter = Router();

recepieRouter.use(validateTokenMiddleware);

recepieRouter.get("/recepies", recepieController.listAll);

recepieRouter.get("/recepies/:recepieId", recepieController.findSingleRecepie);

recepieRouter.post(
  "/recepies",
  validateSchemaMiddleware(recepieSchema),
  recepieController.addNewRecepie
);

export default recepieRouter;
