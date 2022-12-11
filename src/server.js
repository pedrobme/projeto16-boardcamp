import express from "express";
import cors from "cors";
import getCategoryRoute from "./routes/getCategory.route.js";
import postCategoryRoute from "./routes/postCategory.route.js";
import getGamesRoute from "./routes/getGames.route.js";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

//-- ROTAS --
app.use(getCategoryRoute);
app.use(postCategoryRoute);
app.use(getGamesRoute);

app.listen(port, () => console.log(`Server running in port ${port}`));
