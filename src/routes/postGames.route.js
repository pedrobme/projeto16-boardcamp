import { Router } from "express";
import insertOneGame from "../controllers/postGame.controller.js";
import postGameValidation from "../middlewares/postGames.middleware.js";

const router = Router();

router.post("/games", postGameValidation, insertOneGame);

export default router;
