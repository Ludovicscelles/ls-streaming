import { AppDataSource } from "../data-source";
import { DocumentaryEntity } from "../entities/documentary.entity";
import { FilmEntity } from "../entities/film.entity";
import { SeriesEntity } from "../entities/series.entity";
import { SeriesSeasonEntity } from "../entities/series-season.entity";
import { SeriesEpisodeEntity } from "../entities/series-episode.entity";
import { TvShowEntity } from "../entities/tv-show.entity";
import { TvShowSeasonEntity } from "../entities/tv-show-season.entity";
import { TvShowEpisodeEntity } from "../entities/tv-show-episode.entity";
import { documentariesData } from "../data/documentariesData";
import { filmsData } from "../data/filmsData";
import { seriesData } from "../data/seriesData";
import { tvShowData } from "../data/TvShowData";

AppDataSource.initialize().then(async () => {
  const docsRepo = AppDataSource.getRepository(DocumentaryEntity);
  const filmsRepo = AppDataSource.getRepository(FilmEntity);
  const seriesRepo = AppDataSource.getRepository(SeriesEntity);
  const seasonsRepo = AppDataSource.getRepository(SeriesSeasonEntity);
  const episodesRepo = AppDataSource.getRepository(SeriesEpisodeEntity);
  const tvShowsRepo = AppDataSource.getRepository(TvShowEntity);
  const seasonsTvShowRepo = AppDataSource.getRepository(TvShowSeasonEntity);
  const episodesTvShowRepo = AppDataSource.getRepository(TvShowEpisodeEntity);

  for (const doc of documentariesData) {
    const entity = docsRepo.create({
      id: doc.id,
      title: doc.title,
      genre: doc.genre,
      image: doc.image,
      duration: doc.duration,
      releaseDate: doc.releaseDate,
      subject: doc.subject,
      description: doc.description,
    });
    await docsRepo.save(entity);
  }

  for (const film of filmsData) {
    const entity = filmsRepo.create({
      id: film.id,
      title: film.title,
      genre: film.genre,
      image: film.image,
      duration: film.duration,
      releaseDate: film.releaseDate,
      director: film.director,
      synopsis: film.synopsis,
    });
    await filmsRepo.save(entity);
  }

  for (const serie of seriesData) {
    const serieEntity = seriesRepo.create({
      id: serie.id,
      title: serie.title,
      genre: serie.genre,
      image: serie.image,
      synopsis: serie.synopsis,
      seasonEntities: [],
    });
    await seriesRepo.save(serieEntity);

    for (const season of serie.seasonEntities) {
      const seasonEntity = seasonsRepo.create({
        seasonYear: season.seasonYear,
        seasonNumber: season.seasonNumber,
        seasonSynopsis: season.seasonSynopsis,
        serie: serieEntity,
        episodes: [],
      });
      await seasonsRepo.save(seasonEntity);

      for (const episode of season.episodes) {
        const episodeEntity = episodesRepo.create({
          title: episode.title,
          episodeNumber: episode.episodeNumber,
          duration: episode.duration,
          director: episode.director,
          season: seasonEntity,
        });
        await episodesRepo.save(episodeEntity);
      }
    }
  }

  for (const tvShow of tvShowData) {
    const tvShowEntity = tvShowsRepo.create({
      id: tvShow.id,
      title: tvShow.title,
      genre: tvShow.genre,
      image: tvShow.image,
      description: tvShow.description,
      seasonTvShowEntities: [],
    });
    await tvShowsRepo.save(tvShowEntity);

    for (const seasonTvShow of tvShow.seasonTvShowEntities) {
      const seasonTvShowEntity = seasonsTvShowRepo.create({
        seasonYear: seasonTvShow.seasonYear,
        seasonNumber: seasonTvShow.seasonNumber,
        tvHost: seasonTvShow.tvHost,
        seasonDescription: seasonTvShow.seasonDescription,
        tvShow: tvShowEntity,
        episodeTvShowEntities: [],
      });
      await seasonsTvShowRepo.save(seasonTvShowEntity);

      for (const episodeTvShow of seasonTvShow.episodeTvShowEntities) {
        const episodeTvShowEntity = episodesTvShowRepo.create({
          episodeNumber: episodeTvShow.episodeNumber,
          duration: episodeTvShow.duration,
          seasonTvShow: seasonTvShowEntity,
        });
        await episodesTvShowRepo.save(episodeTvShowEntity);
      }
    }
  }

  console.log("Seed terminé");
  process.exit(0);
});
