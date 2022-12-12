import { Router } from "express";
import insertOneCustomer from "../controllers/postCustomers.controller.js";
import postCustomersValidation from "../middlewares/postCustomers.middleware.js";

const router = Router();

router.post("/customers", postCustomersValidation, insertOneCustomer);

export default router;
