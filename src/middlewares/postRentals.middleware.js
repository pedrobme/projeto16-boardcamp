import rentalSchema from "../models/rental.model.js";
import joiSchemaValidation from "../utils/joiSchemaValidation.js";

const rentalValidation = (req, res, next) => {
  const receivedRental = req.body;

  const validation = joiSchemaValidation(rentalSchema, receivedRental);

  if (validation != "successfull") {
    return res.status(422).send(validation);
  }

  next();
};

export default rentalValidation;
