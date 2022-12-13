import { Router } from "express";
import updateOneCustomer from "../controllers/patchCustomers.controller.js";
import postCustomersValidation from "../middlewares/postCustomers.middleware.js";

const router = Router();

router.patch("/customers/:id", postCustomersValidation, updateOneCustomer);

export default router;
