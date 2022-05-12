import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";

export type CreateUserData = Omit<User, "id">;

async function signUp(createUserData: CreateUserData) {
  const existingUser = await userRepository.findByEmail(createUserData.email);
  if (existingUser) throw conflictError("Email already registered.");

  const hashedPassword = bcrypt.hashSync(createUserData.password, 12);

  await userRepository.create({ ...createUserData, password: hashedPassword });
}

export default {
  signUp,
};
