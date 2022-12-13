import dayjs from "dayjs";
import { db } from "../database/connectPG.js";

const returnOneRental = async (req, res) => {
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

    if (rentalValidation.rows[0].returnDate != null) {
      return res.status(400).send("Rental already returned");
    }

    const today = dayjs();

    const delayDays = today.diff(
      dayjs(rentalValidation.rows[0].rentDate),
      "day"
    );

    const delayFee =
      (rentalValidation.rows[0].originalPrice /
        rentalValidation.rows[0].daysRented) *
      delayDays;

    const result = await db.query(
      `
    UPDATE
        rentals
    SET
        ("returnDate","delayFee")=($1,$2)
    WHERE
        id=$3
    `,
      [today, delayFee, searchFilter]
    );

    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default returnOneRental;
