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
import type { TvShowEntity } from "../entities/tv-show.entity";
import type { SeasonTvShowEntity } from "../entities/tv-show-season.entity";

// controller to get all tv shows
export const getAllTvShowsController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllTvShows(),
    "tv shows",
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

// controller to get episodes of a tv show by tv show ID
export const getEpisodesByTvShowIdController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getEpisodesByTvShowId(id),
    "episodes for tv show",
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

// Controller to update a tv show
export const updateTvShowController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeUpdateController(
    (id: string, data: Partial<TvShowEntity>) =>
      movieLibrary.updateTvShow(id, data),
    "TV_SHOW_NOT_FOUND",
    "tv show",
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

// Controller to search tv shows by titles
export const searchTvShowsController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchTvShows(title),
    "tv shows",
  );
};
