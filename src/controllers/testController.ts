import { Request, Response } from "express";
import testService from "../services/testService.js";

async function resetUsers(req: Request, res: Response) {
  await testService.resetUsers();

  res.sendStatus(200);
}

export default {
  resetUsers,
};
