import { categorySchema } from "../models/category.model.js";

const postCategoryValidation = async (req, res, next) => {
  const receivedCategory = req.body;

  if (!receivedCategory.name) {
    return res.status(400).send("Name must not be empty");
  }

  const { error } = categorySchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map(
      (validationError) => validationError.message
    );
    return res.status(422).send(errors);
  }

  next();
};

export default postCategoryValidation;
