import { db } from "../database/connectPG.js";

const getAllGames = async (req, res) => {
  try {
    const categories = await db.query("SELECT * FROM games");
    res.send(categories.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getAllGames;
