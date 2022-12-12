import { db } from "../database/connectPG.js";

const insertOneCustomer = async (req, res) => {
  const receivedCustomer = req.body;

  try {
    const cpfValidation = await db.query(
      "SELECT * FROM customers WHERE cpf=$1",
      [receivedCustomer.cpf]
    );

    if (cpfValidation.rowCount > 0) {
      return res.status(409).send("this CPF is already in use");
    }

    const result = await db.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
      [
        `${receivedCustomer.name}`,
        receivedCustomer.phone,
        receivedCustomer.cpf,
        receivedCustomer.birthday,
      ]
    );

    res.status(201).send(receivedCustomer);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default insertOneCustomer;
