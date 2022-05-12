import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRepository from "../repositories/authRepository.js";
import userRepository from "../repositories/userRepository.js";
import { notFoundError, unauthorizedError } from "../utils/errorUtils.js";
import dotenv from "dotenv";
dotenv.config();

export type SignInData = {
  email: string;
  password: string;
};

async function createSession(userId: number) {
  await authRepository.createSession(userId);
}

async function getSessionByUserId(userId: number) {
  const session = await authRepository.getSessionByUserId(userId);

  return session;
}

async function getSessionById(sessionId: number) {
  const session = await authRepository.getSessionById(sessionId);

  return session;
}

async function deleteSession(sessionId: number) {
  await authRepository.deleteSession(sessionId);
}

async function verifySession(userId: number) {
  const session = await getSessionByUserId(userId);
  if (session) return session;
  else {
    await createSession(userId);
    return await getSessionByUserId(userId);
  }
}

async function generateJWTToken(sessionId: number) {
  const data = { sessionId };
  const secretKey = process.env.JWT_SECRET;

  const token = jwt.sign(data, secretKey);
  console.log({ token });

  return token;
}

async function getUserOfFail(loginData: SignInData) {
  const user = await userRepository.findByEmail(loginData.email);
  if (!user) throw notFoundError("E-mail não cadastrado.");

  const isPasswordValid = bcrypt.compareSync(loginData.password, user.password);
  if (!isPasswordValid)
    throw unauthorizedError("E-mail e/ou senha não correspondem.");

  return user;
}

export default {
  createSession,
  getSessionByUserId,
  getSessionById,
  deleteSession,
  verifySession,
  generateJWTToken,
  getUserOfFail,
};
