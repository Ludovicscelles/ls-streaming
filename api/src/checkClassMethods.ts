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

// search videos by title
export function searchVideosByTitle(title: string) {
  return movieLibrary.search(title);
}

console.log("Search results for 'tita':", searchVideosByTitle("tita"));

console.log("Search results for 'cléo':", searchVideosByTitle("cléo"));

console.log("Search results for 'col':", searchVideosByTitle("col"));

console.log("Search results for 'fort':", searchVideosByTitle("fort"));

// search serie by title
export function searchSeriesByTitle(title: string) {
  return movieLibrary.searchSeries(title);
}

console.log("Search series results for 'ro':", searchSeriesByTitle("ro"));

// search tv shows by title
export function searchTvShowsByTitle(title: string) {
  return movieLibrary.searchTvShows(title);
}

console.log("Search TV shows results for 'tra':", searchTvShowsByTitle("tra"));

// search in all video types
export function searchInAllVideoTypes(title: string) {
  return movieLibrary.searchAll(title);
}

console.log(
  "Search in all video types results for 'le':",
  searchInAllVideoTypes("le")
);

console.log(
  "Search in all video types results for 'an':",
  searchInAllVideoTypes("an")
);

console.log(
  "Search in all video types results for 'bra':",
  searchInAllVideoTypes("bra")
);

// search episodes by title in series
export function searchEpisodesInSeries(episodeTitle: string) {
  return movieLibrary.searchEpisodeSeries(episodeTitle);
}

console.log(
  "Search episodes in series results for 'the':",
  searchEpisodesInSeries("votez")
);

// add a new video to the library
export function addNewVideoToLibrary(video: Film | Documentary) {
  movieLibrary.add(video);
}

const newFilm = new Film(
  "F021",
  "L'Homme qu'on aimait trop",
  "Drama",
  "/images/films/homme-quon-aimait-trop.png",
  120,
  "2014-03-01",
  "André Téchiné"
);

addNewVideoToLibrary(newFilm);
console.log("After adding new film, total library:", getTotalMovieLibrary());

const newDocumentary = new Documentary(
  "D021",
  "La Marche de l'Empereur",
  "Nature",
  "/images/documentaries/marche-empereur.png",
  90,
  "2005",
  "La vie des manchots empereurs"
);

addNewVideoToLibrary(newDocumentary);
console.log(
  "After adding new documentary, total library:",
  getTotalMovieLibrary()
);

// add a new serie to the library
export function addNewSerieToLibrary(serie: Serie) {
  movieLibrary.addSerie(serie);
}

const newSerieSeasons: Season[] = [
  new Season(2006, 1, [
    new Episode("Episode 1", 1, 45, "Louis Choquette"),
    new Episode("Episode 2", 2, 50, "Louis Choquette"),
    new Episode("Episode 3", 3, 48, "Louis Choquette"),
    new Episode("Episode 4", 4, 47, "Louis Choquette"),
    new Episode("Episode 5", 5, 46, "Louis Choquette"),
    new Episode("Episode 6", 6, 49, "Louis Choquette"),
    new Episode("Episode 7", 7, 45, "Louis Choquette"),
    new Episode("Episode 8", 8, 50, "Louis Choquette"),
  ]),
];

const newSerie = new Serie(
  "S003",
  "Mafiosa",
  "drama",
  "/images/series/mafiosa.png",
  newSerieSeasons
);

addNewSerieToLibrary(newSerie);
console.log("After adding new serie, total library:", getTotalMovieLibrary());

// add a new tv show to the library
export function addNewTvShowToLibrary(tvShow: TvShow) {
  movieLibrary.addTvShow(tvShow);
}

const newTvShowSeasons: SeasonTvShow[] = [
  new SeasonTvShow(2017, 13, "Shy'm", [
    new EpisodeTvShow(1, 90),
    new EpisodeTvShow(2, 92),
    new EpisodeTvShow(3, 108),
    new EpisodeTvShow(4, 101),
    new EpisodeTvShow(5, 109),
    new EpisodeTvShow(6, 95),
  ]),
];

const newTvShow = new TvShow(
  "T003",
  "Nouvelle Star",
  "Talent Show",
  "/images/showsTV/nouvelle-star.png",
  "Renaud Le Van Kim",
  newTvShowSeasons
);

addNewTvShowToLibrary(newTvShow);
console.log("After adding new tv show, total library:", getTotalMovieLibrary());

// update video title by id
export function updateVideoTitleById(id: string, newTitle: string) {
  movieLibrary.setTitle(id, newTitle);
}

updateVideoTitleById("S003", "Mafiosa: Le Clan");
console.log(
  "After updating serie title, total library:",
  getTotalMovieLibrary()
);

updateVideoTitleById("T003", "Nouvelle Star: Le Retour");
console.log(
  "After updating tv show title, total library:",
  getTotalMovieLibrary()
);
