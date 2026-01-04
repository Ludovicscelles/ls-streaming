import { Request, Response, RequestHandler } from "express";
import { MovieLibraryRepository } from "../MovieLibraryRepository";
import { makeSearchByTitleController } from "./helpers/searchByTitle.helper";
import { makeGetAllVideosController } from "./helpers/getAll.helper";
import { makeGetByIdController } from "./helpers/getById.helper";
import { makeGetByGenreController } from "./helpers/getByGenre.helper";
import { makeCreateController } from "./helpers/create.helper";
import { makeUpdateController } from "./helpers/update.helper";

// controller to get all videos
export const getAllVideosController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllVideos(),
    "videos"
  );
};

// controller to get all films
export const getAllFilmsController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetAllVideosController(() => movieLibrary.getAllFilms(), "films");
};

// controller to get all documentaries
export const getAllDocumentariesController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllDocumentaries(),
    "documentaries"
  );
};

// controller to get all series
export const getAllSeriesController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllSeries(),
    "series"
  );
};

// controller to get all tv shows
export const getAllTvShowsController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllTvShows(),
    "tv shows"
  );
};

// controller to get film by ID
export const getFilmByIdController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getFilmById(id),
    "film"
  );
};

// controller to get documentary by ID
export const getDocumentaryByIdController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getDocumentaryById(id),
    "documentary"
  );
};

// controller to get serie by ID
export const getSerieByIdController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getSerieById(id),
    "serie"
  );
};

// controller to get tv show by ID
export const getTvShowByIdController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getTvShowById(id),
    "tv show"
  );
};

// controller to filter films by genre
export const getFilmsByGenreController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetByGenreController(
    (genre: string) => movieLibrary.getFilmsByGenre(genre),
    "films"
  );
};

// Controller to filter documentaries by genre
export const getDocumentariesByGenreController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetByGenreController(
    (genre: string) => movieLibrary.getDocumentariesByGenre(genre),
    "documentaries"
  );
};

// Controller to filter series by genre
export const getSeriesByGenreController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetByGenreController(
    (genre: string) => movieLibrary.getSeriesByGenre(genre),
    "series"
  );
};

// Controller to filter tv shows by genre
export const getTvShowsByGenreController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetByGenreController(
    (genre: string) => movieLibrary.getTvShowsByGenre(genre),
    "tv shows"
  );
};

// Controller to create a new film
export const createFilmController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeCreateController((data) => movieLibrary.createFilm(data), "film");
};

// Controller to create a new documentary
export const createDocumentaryController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeCreateController(
    (data) => movieLibrary.createDocumentary(data),
    "documentary"
  );
};

// Controller to create a new serie
export const createSerieController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeCreateController(
    (data) => movieLibrary.createSerie(data),
    "serie"
  );
};

// Controller to create a new tv show
export const createTvShowController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeCreateController(
    (data) => movieLibrary.createTvShow(data),
    "tv show"
  );
};

// Controller to update a film
export const updateFilmController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeUpdateController(
    (id: string, data: Partial<any>) => movieLibrary.updateFilm(id, data),
    "FILM_NOT_FOUND",
    "film"
  );
};

// Controller to update a documentary
export const updateDocumentaryController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeUpdateController(
    (id: string, data: Partial<any>) =>
      movieLibrary.updateDocumentary(id, data),
    "DOCUMENTARY_NOT_FOUND",
    "documentary"
  );
};

// Controller to update a serie
export const updateSerieController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeUpdateController(
    (id: string, data: Partial<any>) => movieLibrary.updateSerie(id, data),
    "SERIE_NOT_FOUND",
    "serie"
  );
};

// Controller to update a tv show
export const updateTvShowController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeUpdateController(
    (id: string, data: Partial<any>) => movieLibrary.updateTvShow(id, data),
    "TV_SHOW_NOT_FOUND",
    "tv show"
  );
};

// Controller to search films by title
// Uses the factory function to create the controller
// that handles film search by title.
// Two parameters are passed:
// 1. The search function from the MovieLibraryRepository
// 2. A label "films" for logging purposes
export const searchFilmsController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchFilms(title),
    "films"
  );
};

// Controller to search documentaries by title
export const searchDocumentariesController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchDocumentaries(title),
    "documentaries"
  );
};

// Controller to search series by title
export const searchSeriesController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchSeries(title),
    "series"
  );
};

// Controller to search serie by episodes title
export const searchSerieByEpisodeTitleController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchSerieByEpisodeTitle(title),
    "series by episode title"
  );
};

// Controller to search episodes by title
export const searchEpisodesController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchEpisodesInSeriesByTitle(title),
    "episodes"
  );
};

// Controller to search tv shows by titles
export const searchTvShowsController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchTvShows(title),
    "tv shows"
  );
};

// Controller to search videos by title across all categories
export const searchAllVideosController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchAllVideosByTitle(title),
    "all videos"
  );
};