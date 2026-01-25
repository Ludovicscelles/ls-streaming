import { RequestHandler } from "express";
import {
  makeGetAllVideosController,
  makeGetByIdController,
  makeGetByGenreController,
  makeCreateController,
  makeUpdateController,
  makeDeleteController,
  makeSearchByTitleController,
  makeCreateWithIdParamController,
} from "./helpers";

import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import type { SeriesSeasonEntity } from "../entities/series-season.entity";
import type { SeriesEntity } from "../entities/series.entity";

// controller to get all series
export const getAllSeriesController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllSeries(),
    "series",
  );
};

// controller to get serie by ID
export const getSerieByIdController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getSerieById(id),
    "serie",
  );
};

// controller to get episodes of a serie by serie ID
export const getEpisodesBySerieIdController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getEpisodesBySerieId(id),
    "episodes for serie",
  );
};

// controller to filter series by genre
export const getSeriesByGenreController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetByGenreController(
    (genre: string) => movieLibrary.getSeriesByGenre(genre),
    "series",
  );
};

// controller to create a new serie
export const createSerieController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeCreateController(
    (data) => movieLibrary.createSerie(data),
    "serie",
  );
};

// controller to create a new season for a serie
export const createSeasonController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeCreateWithIdParamController<
    Partial<SeriesSeasonEntity>,
    SeriesEntity
  >(
    "id",
    (serieId: string, data) => movieLibrary.addSeasonToSerie(serieId, data),
    "season",
  );
};

// controller to update a serie
export const updateSerieController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeUpdateController(
    (id: string, data: Partial<SeriesEntity>) =>
      movieLibrary.updateSerie(id, data),
    "SERIE_NOT_FOUND",
    "serie",
  );
};

// controller to delete a serie
export const deleteSerieController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeDeleteController(
    (id: string) => movieLibrary.deleteSerie(id),
    "SERIE_NOT_FOUND",
    "serie",
  );
};

// controller to search series by title
export const searchSeriesController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchSeries(title),
    "series",
  );
};

// controller to search serie by episodes title
export const searchSerieByEpisodeTitleController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchSerieByEpisodeTitle(title),
    "series by episode title",
  );
};

// controller to search episodes by title
export const searchEpisodesController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchEpisodesInSeriesByTitle(title),
    "episodes",
  );
};
