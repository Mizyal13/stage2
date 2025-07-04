import Joi from "joi";

export const productS = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().min(0).required(),
});
