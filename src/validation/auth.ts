import Joi from "joi";

export const registerS = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("user", "supplier").default("user"),
});

export const loginS = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const resetTokenS = Joi.object({
  email: Joi.string().email().required(),
});

export const resetPasswordS = Joi.object({
  email: Joi.string().email().required(),
  token: Joi.string().required(),
  newPassword: Joi.string().min(6).required(),
});
