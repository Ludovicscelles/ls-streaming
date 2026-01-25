import express from "express";
import { AppDataSource } from "./data-source";
import { MovieLibraryFacade } from "./repositories/movieLibrary.facade";
import { DocumentaryRepository } from "./repositories/documentary.repository";
import { FilmRepository } from "./repositories/film.repository";
import { SerieRepository } from "./repositories/serie.repository";
import { TvShowRepository } from "./repositories/tvShow.repository";
import { DocumentaryEntity } from "./entities/documentary.entity";
import { FilmEntity } from "./entities/film.entity";
import { SerieEntity } from "./entities/series.entity";
import { SeasonEntity } from "./entities/series-season.entity";
import { EpisodeEntity } from "./entities/series-episode.entity";
import { TvShowEntity } from "./entities/tv-show.entity";
import { SeasonTvShowEntity } from "./entities/tv-show-season.entity";
import { EpisodeTvShowEntity } from "./entities/tv-show-episode.entity";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { createVideosRouter } from "./routes/videos.routes";
import { createApiRouter } from "./routes";

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

    const serieRepository = new SerieRepository(
      AppDataSource.getRepository(SerieEntity),
      AppDataSource.getRepository(EpisodeEntity),
      AppDataSource.getRepository(SeasonEntity),
    );

    const tvShowRepository = new TvShowRepository(
      AppDataSource.getRepository(TvShowEntity),
      AppDataSource.getRepository(EpisodeTvShowEntity),
      AppDataSource.getRepository(SeasonTvShowEntity),
    );

    // Initialize MovieLibraryRepository with repositories for each entity
    // This sets up the repository to interact with the database
    const movieLibrary = new MovieLibraryFacade({
      documentaryRepo: documentaryRepository,
      filmRepo: filmRepository,
      serieRepo: serieRepository,
      tvShowRepo: tvShowRepository,
    });

    // Use the video router for handling /api/videos routes
    app.use("/api/videos", createApiRouter(movieLibrary));

    console.log("Data Source has been initialized!");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
