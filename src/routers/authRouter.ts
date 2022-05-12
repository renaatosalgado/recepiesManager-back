import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import authController from "../controllers/authController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { signInSchema } from "../schemas/signInSchema.js";

const authRouter = Router();

authRouter.post(
  "/auth/sign-in",
  validateSchemaMiddleware(signInSchema),
  authController.signIn
);

authRouter.get(
  "/auth/validate",
  validateTokenMiddleware,
  authController.validateToken
);

authRouter.delete(
  "/auth/logout",
  validateTokenMiddleware,
  authController.logout
);

export default authRouter;
