import { Router } from "express";
import getAllGames from "../controllers/getGames.route.js";

const router = Router();

router.get("/games", getAllGames);

export default router;
