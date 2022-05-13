import { Router } from "express";
import authRouter from "./authRouter.js";
import recepieRouter from "./recepieRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(recepieRouter);

export default router;
