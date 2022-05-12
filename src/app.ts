import "./setup.js";
import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";

const app = express();
app.use(json());
app.use(cors());
// if (process.env.NODE_ENV === "test") {
//   app.use(testsRouter);
// }
app.use(errorHandlerMiddleware);

export default app;
