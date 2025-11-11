import { MovieLibrary } from "./MovieLibrary";
import { Film } from "./models/Film";
import { Documentary } from "./models/Documentary";

import { filmsData } from "./data/filmsData";
import { documentariesData } from "./data/documentariesData";

// Create a new instance of MovieLibrary
const movieLibrary = new MovieLibrary();

// Function to initiate data
// and populate the movie library
function initiateData() {
  // Add films to the library
  filmsData.forEach((film) => {
    const newFilm = new Film(
      film.id,
      film.title,
      film.genre,
      film.image,
      film.duration,
      film.realiseDate,
      film.director
    );
    movieLibrary.add(newFilm);
  });

  // Add documentaries to the library
  documentariesData.forEach((doc) => {
    const newDocumentary = new Documentary(
      doc.id,
      doc.title,
      doc.genre,
      doc.image,
      doc.duration,
      doc.realiseDate,
      doc.subject
    );
    movieLibrary.add(newDocumentary);
  });

  return movieLibrary;
}

export default initiateData();
