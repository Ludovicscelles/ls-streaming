import { documentariesData } from "./data/documentariesData";
import { seriesData } from "./data/seriesData";
import { filmsData } from "./data/filmsData";
import { tvShowData } from "./data/TvShowData";

import { MovieLibrary } from "./MovieLibrary";
import { Serie, Season, Episode } from "./models/Serie";
import { Documentary } from "./models/Documentary";
import { Film } from "./models/Film";
import { TvShow, SeasonTvShow, EpisodeTvShow } from "./models/TvShow";
import { Video } from "./models/Video";

import { createDocumentary } from "./utils/createDocumentary";
import { createFilm } from "./utils/createFilm";
import { createSerie } from "./utils/createSerie";

const movieLibrary = new MovieLibrary();

// get total movie library

// add films to the library
filmsData.forEach((film) => {
  const newFilm = createFilm(film);
  movieLibrary.add(newFilm);
});

// add documentaries to the library
documentariesData.forEach((doc) => {
  const newDocumentary = createDocumentary(doc);
  movieLibrary.add(newDocumentary);
});

// add series to the library
seriesData.forEach((serieData) => {
  const newSerie = createSerie(serieData);
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

const newFilm = createFilm({
  id: "F021",
  title: "L'Homme qu'on aimait trop",
  genre: "Drama",
  image: "/images/films/homme-quon-aimait-trop.png",
  duration: 120,
  realiseDate: "2014-03-01",
  director: "André Téchiné",
});

addNewVideoToLibrary(newFilm);
console.log("After adding new film, total library:", getTotalMovieLibrary());

const newDocumentary = createDocumentary({
  id: "D021",
  title: "La Marche de l'Empereur",
  genre: "Nature",
  image: "/images/documentaries/marche-empereur.png",
  duration: 90,
  realiseDate: "2005",
  subject: "La vie des manchots empereurs",
});

addNewVideoToLibrary(newDocumentary);
console.log(
  "After adding new documentary, total library:",
  getTotalMovieLibrary()
);

// add a new serie to the library
export function addNewSerieToLibrary(serie: Serie) {
  movieLibrary.addSerie(serie);
}

const newSerie = createSerie({
  id: "S003",
  title: "Mafiosa",
  genre: "Crime",
  image: "/images/series/mafiosa.png",
  seasonData: [
    {
      seasonYear: 2006,
      seasonNumber: 1,
      episodes: [
        {
          title: "Episode 1",
          numberEpisode: 1,
          duration: 45,
          director: "Louis Choquette",
        },
        {
          title: "Episode 2",
          numberEpisode: 2,
          duration: 50,
          director: "Louis Choquette",
        },
        {
          title: "Episode 3",
          numberEpisode: 3,
          duration: 48,
          director: "Louis Choquette",
        },
        {
          title: "Episode 4",
          numberEpisode: 4,
          duration: 47,
          director: "Louis Choquette",
        },
        {
          title: "Episode 5",
          numberEpisode: 5,
          duration: 46,
          director: "Louis Choquette",
        },
        {
          title: "Episode 6",
          numberEpisode: 6,
          duration: 49,
          director: "Louis Choquette",
        },
        {
          title: "Episode 7",
          numberEpisode: 7,
          duration: 45,
          director: "Louis Choquette",
        },
        {
          title: "Episode 8",
          numberEpisode: 8,
          duration: 50,
          director: "Louis Choquette",
        },
      ],
    },
  ],
});

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

updateVideoTitleById("T003", "Nouvelle Star: Le Retour");

console.log(
  "After updating tv show title, total library:",
  getTotalMovieLibrary()
);

// update a video object by id

export function updateVideoById(id: string, updatedVideo: Partial<Video>) {
  movieLibrary.setVideo(id, updatedVideo);
}

updateVideoById("F021", { genre: "Thriller" });

updateVideoById("D021", { genre: "Vie sauvage" });

updateVideoById("S003", { genre: "Crime Drama" });

updateVideoById("D016", { title: "Les Mystères de l'Atlantide Révélés" });

console.log(
  "After updating documentary title, total library:",
  getTotalMovieLibrary()
);

// delete a video by id

export function deleteVideoById(id: string) {
  movieLibrary.delete(id);
}

deleteVideoById("D021");

deleteVideoById("F019");

console.log("After deleting videos, total library:", getTotalMovieLibrary());
