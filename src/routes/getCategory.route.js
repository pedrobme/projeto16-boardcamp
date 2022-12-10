import { Router } from "express";
import getAllCategories from "../controllers/getCategory.controller.js";

const router = Router();

router.get("/category", getAllCategories);

export default router;
