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
import type { DocumentaryEntity } from "../entities/DocumentaryEntity";

// controller to get all documentaries
export const getAllDocumentariesController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllDocumentaries(),
    "documentaries",
  );
};

// controller to get documentary by ID
export const getDocumentaryByIdController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getDocumentaryById(id),
    "documentary",
  );
};

// controller to filter documentaries by genre
export const getDocumentariesByGenreController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetByGenreController(
    (genre: string) => movieLibrary.getDocumentariesByGenre(genre),
    "documentaries",
  );
};

// controller to create a new documentary
export const createDocumentaryController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeCreateController(
    (data: Partial<DocumentaryEntity>) => movieLibrary.createDocumentary(data),
    "documentary",
  );
};

// controller to update an existing documentary
export const updateDocumentaryController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeUpdateController(
    (id: string, data: Partial<DocumentaryEntity>) =>
      movieLibrary.updateDocumentary(id, data),
    "DOCUMENTARY_NOT_FOUND",
    "documentary",
  );
};

// controller to delete a documentary
export const deleteDocumentaryController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeDeleteController(
    (id: string) => movieLibrary.deleteDocumentary(id),
    "DOCUMENTARY_NOT_FOUND",
    "documentary",
  );
};

// controller to search documentaries by title
export const searchDocumentariesController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchDocumentaries(title),
    "documentaries",
  );
};
