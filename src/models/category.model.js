import joi from "joi";

export const categorySchema = joi.object({
  name: joi.string().min(3).max(30).required(),
});
