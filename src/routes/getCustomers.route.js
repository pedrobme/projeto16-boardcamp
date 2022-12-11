import { Router } from "express";
import getCustomers from "../controllers/getCustumers.controller.js";

const router = Router();

router.get("/customers", getCustomers);

export default router;
