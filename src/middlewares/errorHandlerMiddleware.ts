import { NextFunction, Request, Response } from "express";
import {
  AppError,
  errorTypeToStatusCode,
  isAppError,
} from "../utils/errorUtils.js";

export function errorHandlerMiddleware(
  err: Error | AppError,
  req: Request,
  res: Response,
  //eslint-disable-next-line
  next: NextFunction
) {
  if (isAppError(err)) {
    return res.status(errorTypeToStatusCode(err.type)).send(err.message);
  }

  console.log(err)
  return res.status(500).send(err);
}
