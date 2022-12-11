import { gameSchema } from "../models/game.model.js";
import joiSchemaValidation from "../utils/joiSchemaValidation.js";

const postGameValidation = async (req, res, next) => {
  const receivedGame = req.body;

  if (!receivedGame.name) {
    return res.status(400).send("Name must not be empty");
  }

  const validation = joiSchemaValidation(gameSchema, receivedGame);

  if (validation != "successfull") {
    return res.status(422).send(validation);
  }

  next();
};

export default postGameValidation;
