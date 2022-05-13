import { Router } from "express";
import testController from "../controllers/testController.js";

const testRouter = Router();

testRouter.delete("/users/reset", testController.resetUsers);

export default testRouter;
