import { categorySchema } from "../models/category.model.js";
import joiSchemaValidation from "../utils/joiSchemaValidation.js";

const postCategoryValidation = async (req, res, next) => {
  const receivedCategory = req.body;

  if (!receivedCategory.name) {
    return res.status(400).send("Name must not be empty");
  }

  const validation = joiSchemaValidation(categorySchema, receivedCategory);

  if (validation != "successfull") {
    return res.status(422).send(validation);
  }

  next();
};

export default postCategoryValidation;
