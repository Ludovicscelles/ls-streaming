import { MovieLibrary } from "./MovieLibrary";
import { Film } from "./models/Film";
import { Documentary } from "./models/Documentary";
import { Serie, Season, Episode } from "./models/Serie";
import { TvShow, SeasonTvShow, EpisodeTvShow } from "./models/TvShow";

import { filmsData } from "./data/filmsData";
import { documentariesData } from "./data/documentariesData";
import { seriesData } from "./data/seriesData";
import { tvShowData } from "./data/TvShowData";

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
      film.releaseDate,
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
      doc.releaseDate,
      doc.subject
    );
    movieLibrary.add(newDocumentary);
  });

  // Add series to the library

  seriesData.forEach((serieData) => {
    const seasons: Season[] = serieData.seasonData.map((season) => {
      const episodes: Episode[] = season.episodes.map(
        (ep) =>
          new Episode(ep.title, ep.numberEpisode, ep.duration, ep.director)
      );
      return new Season(season.seasonYear, season.seasonNumber, episodes);
    });

    const newSerie = new Serie(
      serieData.id,
      serieData.title,
      serieData.genre,
      serieData.image,
      seasons
    );
    movieLibrary.addSerie(newSerie);
  });

  // Add TV shows to the library

  tvShowData.forEach((tvShowData) => {
    const seasonsTvShow: SeasonTvShow[] = tvShowData.seasonData.map(
      (season) => {
        const episodesTvShow: EpisodeTvShow[] = season.episodes.map(
          (ep) => new EpisodeTvShow(ep.numberEpisode, ep.duration)
        );
        return new SeasonTvShow(
          season.seasonYear,
          season.seasonNumber,
          season.seasonTVHost,
          episodesTvShow
        );
      }
    );

    const newTvShow = new TvShow(
      tvShowData.id,
      tvShowData.title,
      tvShowData.genre,
      tvShowData.image,
      tvShowData.director,
      seasonsTvShow
    );
    movieLibrary.addTvShow(newTvShow);
  });

  return movieLibrary;
}

export default initiateData();
