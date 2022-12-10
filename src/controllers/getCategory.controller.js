import { db } from "../database/connectPG.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await db.query("SELECT * FROM categories");
    res.send(categories.rows);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default getAllCategories;
