import { RequestHandler } from "express";
import {
  makeGetAllVideosController,
  makeGetByIdController,
  makeGetByGenreController,
  makeCreateController,
  makeUpdateController,
  makeDeleteController,
  makeSearchByTitleController,
} from "./helpers";

import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";

// controller to get all films
export const getAllFilmsController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetAllVideosController(() => movieLibrary.getAllFilms(), "films");
};

// controller to get film by id
export const getFilmByIdController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getFilmById(id),
    "film",
  );
};

// controller to filter films by genre
export const getFilmsByGenreController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetByGenreController(
    (genre: string) => movieLibrary.getFilmsByGenre(genre),
    "films",
  );
};

// controller to create a new film
export const createFilmController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeCreateController(
    (data: any) => movieLibrary.createFilm(data),
    "film",
  );
};

// controller to update an existing film
export const updateFilmController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeUpdateController(
    (id: string, data: Partial<any>) => movieLibrary.updateFilm(id, data),
    "FILM_NOT_FOUND",
    "film",
  );
};

// controller to delete a film
export const deleteFilmController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeDeleteController(
    (id: string) => movieLibrary.deleteFilm(id),
    "FILM_NOT_FOUND",
    "film",
  );
};

// controller to search films by title
// Uses the factory function to create the controller
// that handles film search by title.
// Two parameters are passed:
// 1. A function that takes a title string and returns a list of films matching that title.
// 2. A string "films" indicating the type of videos being searched.
export const searchFilmsController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchFilms(title),
    "films",
  );
};
