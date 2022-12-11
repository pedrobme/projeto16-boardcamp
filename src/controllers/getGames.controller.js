import { db } from "../database/connectPG.js";

const getGames = async (req, res) => {
  const searchFilter = req.query.name;

  try {
    if (searchFilter) {
      const games = await db.query(
        "SELECT * FROM games where LOWER(name) LIKE LOWER($1);",
        [`${searchFilter}%`]
      );
      return res.send(games.rows);
    }

    const games = await db.query("SELECT * FROM games");
    res.send(games.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getGames;
