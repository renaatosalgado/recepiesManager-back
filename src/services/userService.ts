import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import userRepository from "../repositories/userRepository.js";
import { conflictError } from "../utils/errorUtils.js";

export type CreateUserData = Omit<User, "id">;

async function signUp(createUserData: CreateUserData) {
  const existingUser = await userRepository.findByEmail(createUserData.email);
  if (existingUser) throw conflictError("E-mail já cadastrado.");

  const hashedPassword = bcrypt.hashSync(createUserData.password, 12);

  await userRepository.create({ ...createUserData, password: hashedPassword });
}

async function findById(userId: number) {
  return userRepository.findById(userId);
}

export default {
  signUp,
  findById,
};
