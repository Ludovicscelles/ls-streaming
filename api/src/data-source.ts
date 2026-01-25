import "reflect-metadata";
import { DataSource } from "typeorm";
import { FilmEntity } from "./entities/film.entity";
import { DocumentaryEntity } from "./entities/documentary.entity";
import { SeriesEntity } from "./entities/series.entity";
import { SeriesSeasonEntity } from "./entities/series-season.entity";
import { SeriesEpisodeEntity } from "./entities/series-episode.entity";
import { TvShowEntity } from "./entities/tv-show.entity";
import { TvShowSeasonEntity } from "./entities/tv-show-season.entity";
import { TvShowEpisodeEntity } from "./entities/tv-show-episode.entity";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "data/ls-streaming.sqlite",
  entities: [
    FilmEntity,
    DocumentaryEntity,
    SeriesEntity,
    SeriesSeasonEntity,
    SeriesEpisodeEntity,
    TvShowEntity,
    TvShowSeasonEntity,
    TvShowEpisodeEntity,
  ],
  synchronize: true,
  logging: false,
});
