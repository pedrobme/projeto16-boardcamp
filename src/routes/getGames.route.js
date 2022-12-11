import { Router } from "express";
import getGames from "../controllers/getGames.controller.js";

const router = Router();

router.get("/games", getGames);

export default router;
