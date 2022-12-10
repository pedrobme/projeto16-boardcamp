import { db } from "../database/connectPG.js";

const insertOneCategory = async (req, res) => {
  const receivedCategory = req.body;
  console.log(receivedCategory.name);

  try {
    // const db = await connectDB();
    const categoryNameAvailabilitycheck = await db.query(
      "SELECT * FROM categories WHERE name=$1;",
      [receivedCategory.name]
    );

    if (categoryNameAvailabilitycheck.rowCount > 0) {
      return res.status(409).send("Category name already in use");
    }

    const result = await db.query(
      "INSERT INTO categories (name) VALUES ($1);",
      [`${receivedCategory.name}`]
    );

    console.log(result);
    res.status(201).send(receivedCategory);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default insertOneCategory;
