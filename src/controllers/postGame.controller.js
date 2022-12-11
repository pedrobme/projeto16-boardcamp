import { db } from "../database/connectPG.js";

const insertOneGame = async (req, res) => {
  const receivedGame = req.body;
  console.log(req.body);

  try {
    const categoryIdValidation = await db.query(
      "SELECT * FROM categories WHERE id=$1",
      [Number(receivedGame.categoryId)]
    );

    if (categoryIdValidation.rowCount == 0) {
      return res.status(400).send("Invalid category Id");
    }

    const gameNameValidation = await db.query(
      "SELECT * FROM games WHERE LOWER(name)=LOWER($1)",
      [`${receivedGame.name}`]
    );

    if (gameNameValidation.rowCount > 0) {
      return res.status(409).send("Game name already in use");
    }

    const result = await db.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
      [
        `${receivedGame.name}`,
        `${receivedGame.image}`,
        `${receivedGame.stockTotal}`,
        `${receivedGame.categoryId}`,
        `${receivedGame.pricePerDay}`,
      ]
    );

    console.log(result);

    res.status(201).send(receivedGame);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default insertOneGame;
