import "reflect-metadata";
import { DataSource } from "typeorm";
import { FilmEntity } from "./entities/FilmEntity";
import { DocumentaryEntity } from "./entities/DocumentaryEntity";
import { SerieEntity } from "./entities/SerieEntity";
import { SeasonEntity } from "./entities/SeasonEntity";
import { EpisodeEntity } from "./entities/EpisodeEntity";
import { TvShowEntity } from "./entities/TvShowEntity";
import { SeasonTvShowEntity } from "./entities/SeasonTvShowEntity";
import { EpisodeTvShowEntity } from "./entities/EpisodeTvShowEntity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "data/ls-streaming.sqlite",
  entities: [
    FilmEntity,
    DocumentaryEntity,
    SerieEntity,
    SeasonEntity,
    EpisodeEntity,
    TvShowEntity,
    SeasonTvShowEntity,
    EpisodeTvShowEntity,
  ],
  synchronize: true,
  logging: false,
});
