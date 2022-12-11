import { db } from "../database/connectPG.js";

const getCustomerById = async (req, res) => {
  const searchFilter = req.params.id;

  try {
    const customer = await db.query("SELECT * FROM customers WHERE id=$1", [
      searchFilter,
    ]);
    res.send(customer.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getCustomerById;
