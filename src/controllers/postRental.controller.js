import dayjs from "dayjs";
import { db } from "../database/connectPG.js";

const insertOneRental = async (req, res) => {
  const receivedRental = req.body;

  if (receivedRental.daysRented <= 0) {
    return res.status(400).send("Days rentend must be higher than 0");
  }

  try {
    const customerValidation = await db.query(
      `
    SELECT
        *
    FROM
        customers
    WHERE
        customers.id=$1
    `,
      [receivedRental.customerId]
    );

    if (customerValidation.rowCount < 1) {
      return res.status(400).send("invalid customer id");
    }

    const gameValidation = await db.query(
      `
    SELECT
        *
    FROM
        games
    WHERE
        games.id=$1
    `,
      [receivedRental.gameId]
    );

    if (gameValidation.rowCount < 1) {
      return res.status(400).send("invalid game id");
    }

    const avaibleForRentValidation = await db.query(
      `
    SELECT
        *
    FROM
        rentals
    WHERE
        rentals."gameId"=$1
    `,
      [receivedRental.gameId]
    );

    if (
      avaibleForRentValidation.rowCount == gameValidation.rows[0].stockTotal
    ) {
      return res.status(400).send("All units already rented");
    }

    const today = dayjs();

    const newRentalObj = {
      ...receivedRental,
      rentDate: today,
      originalPrice:
        receivedRental.daysRented * gameValidation.rows[0].pricePerDay,
      returnDate: null,
      delayFee: null,
    };

    const result = await db.query(
      `
    INSERT
    INTO
        rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
    VALUES
        ($1,$2,$3,$4,$5,$6,$7)
    `,
      [
        newRentalObj.customerId,
        newRentalObj.gameId,
        newRentalObj.daysRented,
        newRentalObj.rentDate,
        newRentalObj.originalPrice,
        newRentalObj.returnDate,
        newRentalObj.delayFee,
      ]
    );

    res.status(201).send(newRentalObj);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default insertOneRental;
