import { Router } from "express";
import getCustomers from "../controllers/getCustomers.controller.js";

const router = Router();

router.get("/customers", getCustomers);

export default router;
