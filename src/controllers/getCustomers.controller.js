import { db } from "../database/connectPG.js";

const getCustomers = async (req, res) => {
  const searchFilter = req.query.cpf;

  try {
    if (searchFilter) {
      const customers = await db.query(
        "SELECT * FROM customers WHERE cpf LIKE $1;",
        [`${searchFilter}%`]
      );
      return res.send(customers.rows);
    }

    const customers = await db.query("SELECT * FROM customers");
    res.send(customers.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getCustomers;
