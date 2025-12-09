import express from "express";
import { AppDataSource } from "./data-source";
import { MovieLibraryRepository } from "./MovieLibraryRepository";
import { DocumentaryEntity } from "./entities/DocumentaryEntity";
import { FilmEntity } from "./entities/FilmEntity";
import { SerieEntity } from "./entities/SerieEntity";
import { TvShowEntity } from "./entities/TvShowEntity";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { createVideoRouter } from "./routes/videoRoutes";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
// app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API LS-Streaming !");
});

app.use("/api/images", express.static("images"));

AppDataSource.initialize()
  .then(() => {

    // Initialize MovieLibraryRepository with repositories for each entity
    // This sets up the repository to interact with the database
    const movieLibrary = new MovieLibraryRepository(
      AppDataSource.getRepository(DocumentaryEntity),
      AppDataSource.getRepository(FilmEntity),
      AppDataSource.getRepository(SerieEntity),
      AppDataSource.getRepository(TvShowEntity)
    );

    // Use the video router for handling /api/videos routes
    app.use("/api/videos", createVideoRouter(movieLibrary));

    console.log("Data Source has been initialized!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
