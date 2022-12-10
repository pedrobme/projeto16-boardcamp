import { Router } from "express";
import insertOneCategory from "../controllers/postCategory.controller.js";
import postCategoryValidation from "../middlewares/postCategory.middleware.js";

const router = Router();

router.post("/category", postCategoryValidation, insertOneCategory);

export default router;
