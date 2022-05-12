import { Request, Response } from "express";
import authService, { SignInData } from "../services/authService.js";

async function signIn(req: Request, res: Response) {
  const signInData: SignInData = req.body;

  const user = await authService.getUserOfFail(signInData);

  const session = await authService.verifySession(user.id);

  const token = await authService.generateJWTToken(session.id);

  res.status(200).send({ token });
}

function validateToken(req: Request, res: Response) {
  res.sendStatus(200);
}

async function logout(req: Request, res: Response) {
  const user = res.locals.user;

  const session = await authService.getSessionByUserId(user.id);

  await authService.deleteSession(session.id);

  res.sendStatus(200);
}

export default {
  signIn,
  validateToken,
  logout,
};
