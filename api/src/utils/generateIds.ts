import { FilmEntity } from "../entities/FilmEntity";
import { DocumentaryEntity } from "../entities/DocumentaryEntity";
import { SerieEntity } from "../entities/SerieEntity";
import { TvShowEntity } from "../entities/TvShowEntity";
import { Repository } from "typeorm";

// Function to generate a new unique film ID
export async function generateFilmId(
  // Repository for accessing FilmEntity records in the database
  // The function returns a Promise that resolves to a string (the new film ID)
  filmRepo: Repository<FilmEntity>
): Promise<string> {
  // Query the film repository to find the film with the highest ID
  const lastFilm = await filmRepo
    // create a query builder for the FilmEntity
    .createQueryBuilder("film")
    // order the results by the numeric part of the ID in descending order
    // CAST and SUBSTRING are used to extract and convert the numeric part of the ID
    // this ensures we get the film with the highest numeric ID
    .orderBy("CAST(SUBSTRING(film.id, 2) AS INTEGER)", "DESC")
    // limit the result to just one record
    .getOne();

  // If no films exist, start with "F001"
  if (!lastFilm) {
    return "F001";
  }
  // Extract the numeric part of the last film's ID, increment it, and format it
  const lastIdNumber = parseInt(lastFilm.id.slice(1));
  // Increment the numeric part by 1
  const newIdNumber = lastIdNumber + 1;
  // Return the new ID formatted as "F" followed by a zero-padded number
  // padStart ensures the number is at least 3 digits long
  // e.g., "F002", "F010", "F100"
  return `F${newIdNumber.toString().padStart(3, "0")}`;
}

// Function to generate a new unique documentary ID
export async function generateDocumentaryId(
  documentaryRepo: Repository<DocumentaryEntity>
): Promise<string> {
  const lastDocumentary = await documentaryRepo
    .createQueryBuilder("documentary")
    .orderBy("CAST(SUBSTRING(documentary.id, 2) AS INTEGER)", "DESC")
    .getOne();

  if (!lastDocumentary) {
    return "D001";
  }

  const lastIdNumber = parseInt(lastDocumentary.id.slice(1));

  const newIdNumber = lastIdNumber + 1;

  return `D${newIdNumber.toString().padStart(3, "0")}`;
}

// Function to generate a new unique serie ID
export async function generateSerieId(
  serieRepo: Repository<SerieEntity>
): Promise<string> {
  const lastSerie = await serieRepo
    .createQueryBuilder("serie")
    .orderBy("CAST(SUBSTRING(serie.id, 2) AS INTEGER)", "DESC")
    .getOne();

  if (!lastSerie) {
    return "S001";
  }

  const lastIdNumber = parseInt(lastSerie.id.slice(1));

  const newIdNumber = lastIdNumber + 1;

  return `S${newIdNumber.toString().padStart(3, "0")}`;
}

// Function to generate a new unique tv show ID
export async function generateTvShowId(
  tvShowRepo: Repository<TvShowEntity>
): Promise<string> {
  const lastTvShow = await tvShowRepo
    .createQueryBuilder("tvShow")
    .orderBy("CAST(SUBSTRING(tvShow.id, 2) AS INTEGER)", "DESC")
    .getOne();

  if (!lastTvShow) {
    return "T001";
  }

  const lastIdNumber = parseInt(lastTvShow.id.slice(1));

  const newIdNumber = lastIdNumber + 1;

  return `T${newIdNumber.toString().padStart(3, "0")}`;
}
