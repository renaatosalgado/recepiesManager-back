import { NextFunction, Request, Response } from "express";
import authService from "../services/authService.js";
import userService from "../services/userService.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { unauthorizedError } from "../utils/errorUtils.js";
import dotenv from "dotenv";
dotenv.config();

export async function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");
  if (!token) throw unauthorizedError("Token inexistente.");

  console.log({ token });

  const secretKey = process.env.JWT_SECRET;

  try {
    const data = jwt.verify(token, secretKey);

    const { sessionId } = data as JwtPayload;

    if (!sessionId) throw unauthorizedError("Este token não é válido.");

    const session = await authService.getSessionById(sessionId);

    if (session === null) {
      throw unauthorizedError(
        "Sessão encerrada, por favor faça login novamente."
      );
    }

    const user = await userService.findById(session.userId);

    if (!user) throw unauthorizedError("Usuário inexistente.");

    res.locals.user = user;
  } catch (error) {
    if (error.type) throw unauthorizedError(error.message);
    throw unauthorizedError("Este token não é válido.");
  }

  next();
}
