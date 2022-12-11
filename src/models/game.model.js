import joi from "joi";

export const gameSchema = joi.object({
  name: joi.string().min(3).max(30).required(),
  image: joi.string().uri().required(),
  stockTotal: joi.number().positive().required(),
  pricePerDay: joi.number().positive().required(),
  categoryId: joi.number().positive().required(),
});
