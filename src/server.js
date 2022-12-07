import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.listen(port, () => console.log(`Server running in port ${port}`));
