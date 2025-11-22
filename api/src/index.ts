import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import videoRoutes from "./routes/videoRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
// app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API LS-Streaming !");
});

app.use("/api/videos", videoRoutes);
app.use("/api/images", express.static("images"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
