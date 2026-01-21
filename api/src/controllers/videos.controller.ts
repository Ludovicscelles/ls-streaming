import { RequestHandler } from "express";
import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import { makeSearchByTitleController } from "./helpers/searchByTitle.helper";
import { makeGetAllVideosController } from "./helpers/getAll.helper";
import { makeGetByIdController } from "./helpers/getById.helper";
import { makeGetByGenreController } from "./helpers/getByGenre.helper";
import { makeCreateController } from "./helpers/create.helper";
import { makeCreateWithIdParamController } from "./helpers/createWithIdParam.helper";
import { makeUpdateController } from "./helpers/update.helper";
import { makeDeleteController } from "./helpers/delete.helper";
import type { TvShowEntity } from "../entities/TvShowEntity";
import type { SeasonTvShowEntity } from "../entities/SeasonTvShowEntity";
import type { SerieEntity } from "../entities/SerieEntity";
import type { SeasonEntity } from "../entities/SeasonEntity";

// controller to get all videos
export const getAllVideosController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllVideos(),
    "videos",
  );
};

// controller to get all series
export const getAllSeriesController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllSeries(),
    "series",
  );
};

// controller to get all tv shows
export const getAllTvShowsController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllTvShows(),
    "tv shows",
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

// controller to get tv show by ID
export const getTvShowByIdController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getTvShowById(id),
    "tv show",
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

// controller to get episodes of a tv show by tv show ID
export const getEpisodesByTvShowIdController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getEpisodesByTvShowId(id),
    "episodes for tv show",
  );
};

// Controller to filter series by genre
export const getSeriesByGenreController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetByGenreController(
    (genre: string) => movieLibrary.getSeriesByGenre(genre),
    "series",
  );
};

// Controller to filter tv shows by genre
export const getTvShowsByGenreController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetByGenreController(
    (genre: string) => movieLibrary.getTvShowsByGenre(genre),
    "tv shows",
  );
};

// Controller to create a new serie
export const createSerieController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeCreateController(
    (data) => movieLibrary.createSerie(data),
    "serie",
  );
};

// Controller to create a new season for a serie
export const createSeasonController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeCreateWithIdParamController<Partial<SeasonEntity>, SerieEntity>(
    "id",
    (serieId: string, data) => movieLibrary.addSeasonToSerie(serieId, data),
    "season",
  );
};

// Controller to create a new tv show
export const createTvShowController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeCreateController(
    (data) => movieLibrary.createTvShow(data),
    "tv show",
  );
};

// Controller to create a new season for a tv show
export const createSeasonTvShowController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeCreateWithIdParamController<
    Partial<SeasonTvShowEntity>,
    TvShowEntity
  >(
    "id",
    (tvShowId: string, data) => movieLibrary.addSeasonToTvShow(tvShowId, data),
    "season",
  );
};

// Controller to update a serie
export const updateSerieController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeUpdateController(
    (id: string, data: Partial<any>) => movieLibrary.updateSerie(id, data),
    "SERIE_NOT_FOUND",
    "serie",
  );
};

// Controller to update a tv show
export const updateTvShowController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeUpdateController(
    (id: string, data: Partial<any>) => movieLibrary.updateTvShow(id, data),
    "TV_SHOW_NOT_FOUND",
    "tv show",
  );
};

// Controller to delete a serie
export const deleteSerieController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeDeleteController(
    (id: string) => movieLibrary.deleteSerie(id),
    "SERIE_NOT_FOUND",
    "serie",
  );
};

// Controller to delete a tv show
export const deleteTvShowController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeDeleteController(
    (id: string) => movieLibrary.deleteTvShow(id),
    "TV_SHOW_NOT_FOUND",
    "tv show",
  );
};

// Controller to search series by title
export const searchSeriesController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchSeries(title),
    "series",
  );
};

// Controller to search serie by episodes title
export const searchSerieByEpisodeTitleController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchSerieByEpisodeTitle(title),
    "series by episode title",
  );
};

// Controller to search episodes by title
export const searchEpisodesController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchEpisodesInSeriesByTitle(title),
    "episodes",
  );
};

// Controller to search tv shows by titles
export const searchTvShowsController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchTvShows(title),
    "tv shows",
  );
};

// Controller to search videos by title across all categories
export const searchAllVideosController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchAllVideosByTitle(title),
    "all videos",
  );
};
