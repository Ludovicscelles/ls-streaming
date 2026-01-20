import express from "express";
import { AppDataSource } from "./data-source";
import { MovieLibraryRepository } from "./repositories/movieLibrary.facade";
import { DocumentaryRepository } from "./repositories/documentary.repository";
import { FilmRepository } from "./repositories/film.repository";
import { DocumentaryEntity } from "./entities/DocumentaryEntity";
import { FilmEntity } from "./entities/FilmEntity";
import { SerieEntity } from "./entities/SerieEntity";
import { SeasonEntity } from "./entities/SeasonEntity";
import { EpisodeEntity } from "./entities/EpisodeEntity";
import { TvShowEntity } from "./entities/TvShowEntity";
import { SeasonTvShowEntity } from "./entities/SeasonTvShowEntity";
import { EpisodeTvShowEntity } from "./entities/EpisodeTvShowEntity";
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
    const documentaryRepository = new DocumentaryRepository(
      AppDataSource.getRepository(DocumentaryEntity),
    );

    const filmRepository = new FilmRepository(
      AppDataSource.getRepository(FilmEntity),
    );

    // Initialize MovieLibraryRepository with repositories for each entity
    // This sets up the repository to interact with the database
    const movieLibrary = new MovieLibraryRepository(
      documentaryRepository,
      filmRepository,
      AppDataSource.getRepository(SerieEntity),
      AppDataSource.getRepository(TvShowEntity),
      AppDataSource.getRepository(EpisodeEntity),
      AppDataSource.getRepository(SeasonEntity),
      AppDataSource.getRepository(EpisodeTvShowEntity),
      AppDataSource.getRepository(SeasonTvShowEntity),
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
