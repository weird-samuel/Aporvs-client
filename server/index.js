import express from "express";
import cors from "cors";
import { port } from "../server/config.js";

const app = express();
// Middleware to parse json data
app.use(express.json());
// Middleware to allow cross-origin requests
app.use(cors());

app.get("/", (req, res) => {
  res.status(234).send("You should not be here, this is the server.");
});

app.listen(port, () => {
  console.log(
    `Server is listening on port ${port}\nvisit http://localhost:${port}`
  );
});
