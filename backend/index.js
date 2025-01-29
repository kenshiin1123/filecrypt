import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log("Listening to port", PORT);
});
