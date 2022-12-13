import { Router } from "express";
import insertOneRental from "../controllers/postRental.controller.js";
import rentalValidation from "../middlewares/postRentals.middleware.js";

const router = Router();

router.post("/rentals", rentalValidation, insertOneRental);

export default router;
