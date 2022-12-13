import { Router } from "express";
import returnOneRental from "../controllers/postRentalsReturn.controller.js";

const router = Router();

router.post("/rentals/:id/return", returnOneRental);

export default router;
