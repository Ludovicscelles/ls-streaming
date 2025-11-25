import { AppDataSource } from "../data-source";
import { DocumentaryEntity } from "../entities/DocumentaryEntity";
import { documentariesData } from "../data/documentariesData";

AppDataSource.initialize().then(async () => {
  const repo = AppDataSource.getRepository(DocumentaryEntity);

  for (const doc of documentariesData) {
    const entity = repo.create({
      id: doc.id,
      title: doc.title,
      genre: doc.genre,
      image: doc.image,
      duration: doc.duration,
      realeaseDate: doc.realiseDate,
      subject: doc.subject,
    });
    await repo.save(entity);
  }

  console.log("Seed terminé");
  process.exit(0);
});
