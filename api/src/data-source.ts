import "reflect-metadata";
import { DataSource } from "typeorm";
import { FilmEntity } from "./entities/film.entity";
import { DocumentaryEntity } from "./entities/documentary.entity";
import { SerieEntity } from "./entities/series.entity";
import { SeasonEntity } from "./entities/series-season.entity";
import { EpisodeEntity } from "./entities/series-episode.entity";
import { TvShowEntity } from "./entities/tv-show.entity";
import { SeasonTvShowEntity } from "./entities/tv-show-season.entity";
import { EpisodeTvShowEntity } from "./entities/tv-show-episode.entity";

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
