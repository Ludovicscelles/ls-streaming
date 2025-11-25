import { AppDataSource } from "../data-source";
import { DocumentaryEntity } from "../entities/DocumentaryEntity";
import { FilmEntity } from "../entities/FilmEntity";
import { documentariesData } from "../data/documentariesData";
import { filmsData } from "../data/filmsData";

AppDataSource.initialize().then(async () => {
  const docsRepo = AppDataSource.getRepository(DocumentaryEntity);
  const filmsRepo = AppDataSource.getRepository(FilmEntity);

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

  console.log("Seed terminé");
  process.exit(0);
});
