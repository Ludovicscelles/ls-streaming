import { FilmEntity } from "../entities/FilmEntity";
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
  return `F${newIdNumber.toString().padStart(3, "0")}`;
}
