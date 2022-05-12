import joi from "joi";
import { CreateUserData } from "../services/userService.js";

export const userSchema = joi.object<CreateUserData>({
  name: joi.string().required(),
  email: joi.string().required(),
  password: joi.string().min(4).required(),
});
