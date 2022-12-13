import { db } from "../database/connectPG.js";

const updateOneCustomer = async (req, res) => {
  const searchFilter = req.params.id;

  const receivedCustomer = req.body;

  try {
    const cpfValidation = await db.query(
      "SELECT * FROM customers WHERE cpf=$1",
      [receivedCustomer.cpf]
    );

    console.log(cpfValidation);

    if (
      cpfValidation.rowCount > 0 &&
      cpfValidation.rows[0].id != searchFilter
    ) {
      return res.status(409).send("this CPF is already in use");
    }

    const result = await db.query(
      "UPDATE customers SET (name, phone, cpf, birthday)=($1, $2, $3, $4) WHERE id=$5",
      [
        `${receivedCustomer.name}`,
        receivedCustomer.phone,
        receivedCustomer.cpf,
        receivedCustomer.birthday,
        searchFilter,
      ]
    );

    res.status(201).send(receivedCustomer);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export default updateOneCustomer;
