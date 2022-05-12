import joi from "joi";
import { SignInData } from "../services/authService.js";

export const signInSchema = joi.object<SignInData>({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
