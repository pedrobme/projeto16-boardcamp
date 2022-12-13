import { Router } from "express";
import getRentals from "../controllers/getRentals.controller.js";

const router = Router();

router.get("/rentals", getRentals);

export default router;
