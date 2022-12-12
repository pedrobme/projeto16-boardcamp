import { customerSchema } from "../models/customer.model.js";
import joiSchemaValidation from "../utils/joiSchemaValidation.js";

const postCustomersValidation = (req, res, next) => {
  const receivedCustomer = req.body;

  if (!receivedCustomer.name) {
    return res.status(400).send("Name must not be empty");
  }

  const validation = joiSchemaValidation(customerSchema, receivedCustomer);

  if (validation != "successfull") {
    return res.status(422).send(validation);
  }

  const birthdayArray = receivedCustomer.birthday.split("-");

  const monthsDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (
    !birthdayArray[0] ||
    !birthdayArray[1] ||
    !birthdayArray[2] ||
    Number(birthdayArray[0]) < 1900 ||
    Number(birthdayArray[0]) > 2022 ||
    Number(birthdayArray[1]) < 1 ||
    Number(birthdayArray[1]) > 12 ||
    Number(birthdayArray[2]) < 1 ||
    Number(birthdayArray[2]) > monthsDays[birthdayArray[1] - 1]
  ) {
    return res.status(400).send("invalid birthday date format");
  }

  next();
};

export default postCustomersValidation;
