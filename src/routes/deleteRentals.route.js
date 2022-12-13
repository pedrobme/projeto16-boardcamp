import { Router } from "express";
import deleteOneRental from "../controllers/deleteRentals.controller.js";

const router = Router();

router.delete("/rentals/:id", deleteOneRental);

export default router;
