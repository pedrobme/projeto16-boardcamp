import { db } from "../database/connectPG.js";

const getRentals = async (req, res) => {
  const customerFilter = req.query.customerId;
  const gameFilter = req.query.gameId;

  try {
    const rentals = await db.query(`
    SELECT
        *
    FROM
        rentals
    `);

    const customers = await db.query(`
    SELECT
        id, name
    FROM
        customers
    `);

    const games = await db.query(`
    SELECT
        games.id, games.name, games."categoryId", categories.name as "categoryName"
    FROM
        games
    JOIN
        categories
    ON
        games."categoryId"=categories.id
    `);

    let result = rentals.rows.map((rental) => {
      return {
        ...rental,
        customer: customers.rows.find(
          (customerObj) => customerObj.id == rental.customerId
        ),
        game: games.rows.find((gameObj) => gameObj.id == rental.gameId),
      };
    });

    if (customerFilter) {
      result = result.filter(
        (rentalObj) => rentalObj.customerId == customerFilter
      );
    }

    if (gameFilter) {
      result = result.filter((rentalObj) => rentalObj.gameId == gameFilter);
    }

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default getRentals;
