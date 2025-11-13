import { documentariesData } from "./data/documentariesData";
import { seriesData } from "./data/seriesData";
import { filmsData } from "./data/filmsData";
import { tvShowData } from "./data/TvShowData";

import { MovieLibrary } from "./MovieLibrary";
import { Serie, Season, Episode } from "./models/Serie";
import { Documentary } from "./models/Documentary";
import { Film } from "./models/Film";
import { TvShow, SeasonTvShow, EpisodeTvShow } from "./models/TvShow";

const movieLibrary = new MovieLibrary();

// get total movie library

// add films to the library
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

// add documentaries to the library
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

// add series to the library
seriesData.forEach((serieData) => {
  const seasons: Season[] = serieData.seasonData.map((season) => {
    const episodes: Episode[] = season.episodes.map(
      (ep) => new Episode(ep.title, ep.numberEpisode, ep.duration, ep.director)
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

// add tv shows to the library
tvShowData.forEach((tvShowData) => {
  const seasons: SeasonTvShow[] = tvShowData.seasonData.map((season) => {
    const episodes: EpisodeTvShow[] = season.episodes.map(
      (ep) => new EpisodeTvShow(ep.numberEpisode, ep.duration)
    );
    return new SeasonTvShow(
      season.seasonYear,
      season.seasonNumber,
      season.seasonTVHost,
      episodes
    );
  });

  const newTvShow = new TvShow(
    tvShowData.id,
    tvShowData.title,
    tvShowData.genre,
    tvShowData.image,
    tvShowData.director,
    seasons
  );

  movieLibrary.addTvShow(newTvShow);
});
export function getTotalMovieLibrary() {
  return movieLibrary.getAll();
}

console.log("Total Movie Library:", getTotalMovieLibrary());

// get videos by ID

export function getVideoById(id: string) {
  return movieLibrary.getById(id);
}

console.log("Video with ID 'F001':", getVideoById("F001"));

console.log("Video with ID 'S002':", getVideoById("S002"));

console.log("Video with ID 'T001':", getVideoById("T001"));

console.log("Video with ID 'D007':", getVideoById("D007"));
