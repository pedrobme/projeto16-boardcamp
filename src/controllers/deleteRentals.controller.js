import { db } from "../database/connectPG.js";

const deleteOneRental = async (req, res) => {
  const searchFilter = req.params.id;

  try {
    const rentalValidation = await db.query(
      `
    SELECT
        *
    FROM
        rentals
    WHERE
        id=$1
    `,
      [searchFilter]
    );

    if (rentalValidation.rowCount < 1) {
      return res.status(404).send("Invalid rental id");
    }

    const result = await db.query(
      `
        DELETE FROM
            rentals
        WHERE
            id=$1
        `,
      [searchFilter]
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default deleteOneRental;
