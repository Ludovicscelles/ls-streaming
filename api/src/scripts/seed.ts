import { AppDataSource } from "../data-source";
import { DocumentaryEntity } from "../entities/DocumentaryEntity";
import { FilmEntity } from "../entities/FilmEntity";
import { SerieEntity } from "../entities/SerieEntity";
import { SeasonEntity } from "../entities/SeasonEntity";
import { EpisodeEntity } from "../entities/EpisodeEntity";
import { documentariesData } from "../data/documentariesData";
import { filmsData } from "../data/filmsData";
import { seriesData } from "../data/seriesData";

AppDataSource.initialize().then(async () => {
  const docsRepo = AppDataSource.getRepository(DocumentaryEntity);
  const filmsRepo = AppDataSource.getRepository(FilmEntity);
  const seriesRepo = AppDataSource.getRepository(SerieEntity);
  const seasonsRepo = AppDataSource.getRepository(SeasonEntity);
  const episodesRepo = AppDataSource.getRepository(EpisodeEntity);

  for (const doc of documentariesData) {
    const entity = docsRepo.create({
      id: doc.id,
      title: doc.title,
      genre: doc.genre,
      image: doc.image,
      duration: doc.duration,
      releaseDate: doc.releaseDate,
      subject: doc.subject,
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
    });
    await filmsRepo.save(entity);
  }

  for (const serie of seriesData) {
    const serieEntity = seriesRepo.create({
      id: serie.id,
      title: serie.title,
      genre: serie.genre,
      image: serie.image,
      seasonEntities: [],
    });
    await seriesRepo.save(serieEntity);

    for (const season of serie.seasonData) {
      const seasonEntity = seasonsRepo.create({
        seasonYear: season.seasonNumber,
        seasonNumber: season.seasonNumber,
        serie: serieEntity,
        episodes: [],
      });
      await seasonsRepo.save(seasonEntity);

      for (const episode of season.episodes) {
        const episodeEntity = episodesRepo.create({
          title: episode.title,
          episodeNumber: episode.numberEpisode,
          duration: episode.duration,
          director: episode.director,
          season: seasonEntity,
        });
        await episodesRepo.save(episodeEntity);
      }
    }
  }

  console.log("Seed terminé");
  process.exit(0);
});
