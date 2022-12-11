import { Router } from "express";
import getCustomerById from "../controllers/getCustomerById.controller.js";

const router = Router();

router.get("/customers/:id", getCustomerById);

export default router;
