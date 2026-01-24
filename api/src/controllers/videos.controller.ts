import { RequestHandler } from "express";
import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import {
  makeGetAllVideosController,
  makeSearchByTitleController,
} from "./helpers";

// controller to get all videos
export const getAllVideosController = (
  movieLibrary: MovieLibraryFacade,
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllVideos(),
    "videos",
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
