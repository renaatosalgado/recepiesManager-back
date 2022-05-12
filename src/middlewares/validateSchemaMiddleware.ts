import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { wrongSchemaError } from "../utils/errorUtils.js";

export function validateSchemaMiddleware(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validation = schema.validate(req.body);
    if (validation.error) {
      throw wrongSchemaError(validation.error.message);
    }

    next();
  };
}
