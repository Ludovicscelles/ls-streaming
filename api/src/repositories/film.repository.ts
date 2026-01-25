import { Repository, Like } from "typeorm";
import { FilmEntity } from "../entities/film.entity";

import { generateFilmId } from "../utils/generateIds";

export class FilmRepository {
  constructor(private readonly filmRepo: Repository<FilmEntity>) {}

  // Method to get all films
  async getAllFilms(): Promise<FilmEntity[]> {
    return this.filmRepo.find();
  }

  // Method to get a film by its ID
  async getFilmById(id: string): Promise<FilmEntity | null> {
    return this.filmRepo.findOne({ where: { id } });
  }

  // Method to filter films by genre
  async getFilmsByGenre(genre: string): Promise<FilmEntity[]> {
    return this.filmRepo.find({
      where: { genre: Like(`%${genre.trim().toLowerCase()}%`) },
    });
  }

  // Method to create a new film
  async createFilm(data: Partial<FilmEntity>): Promise<FilmEntity> {
    const id = await generateFilmId(this.filmRepo);
    const newFilm = this.filmRepo.create({ id, ...data });
    await this.filmRepo.insert(newFilm);
    return this.filmRepo.findOneByOrFail({ id: newFilm.id! });
  }

  // Method to update an existing film
  // takes the film ID and a partial FilmEntity object with updated data
  async updateFilm(id: string, data: Partial<FilmEntity>) {
    // create a safeData object to hold only valid fields that are allowed to be updated
    // this prevents accidental overwriting of fields with undefined values or overwriting fields that should not be changed
    // it permits excluding fields like 'id' or any other non-updatable fields
    // we ensure that only fields explicitly provided in the 'data' object are included in 'safeData' like title, genre, image, duration, releaseDate, director, and cast
    // this is a common practice to maintain data integrity and avoid unintended side effects during updates
    const safeData: Partial<FilmEntity> = {};

    // Only copy allowed fields if they are defined in the input data
    if (data.title !== undefined) safeData.title = data.title;
    if (data.genre !== undefined) safeData.genre = data.genre;
    if (data.image !== undefined) safeData.image = data.image;
    if (data.duration !== undefined) safeData.duration = data.duration;
    if (data.releaseDate !== undefined) safeData.releaseDate = data.releaseDate;
    if (data.director !== undefined) safeData.director = data.director;

    // If no valid fields are provided for update, throw an error
    // this prevents unnecessary database operations and ensures that the caller is aware that no valid update data was provided
    if (Object.keys(safeData).length === 0) {
      throw Object.assign(new Error("No valid update fields provided"), {
        code: "NO_VALID_FIELDS",
      });
    }

    // preload the existing film entity to ensure it exists before updating
    const film = await this.filmRepo.preload({ id, ...safeData });

    // if the film does not exist, throw an error indicating that the film was not found
    if (!film) {
      throw Object.assign(new Error("Film with not found"), {
        code: "FILM_NOT_FOUND",
      });
    }

    // save the updated film data to the database
    return this.filmRepo.save(film);
  }

  // Method to delete a film by its ID
  async deleteFilm(id: string): Promise<void> {
    const result = await this.filmRepo.delete(id);
    if (!result.affected || result.affected === 0) {
      throw Object.assign(new Error("Film not found"), {
        code: "FILM_NOT_FOUND",
      });
    }
  }

  // Method to search films by title
  async searchFilmsByTitle(title: string): Promise<FilmEntity[]> {
    return this.filmRepo.find({
      where: { title: Like(`%${title.trim().toLowerCase()}%`) },
    });
  }
}
