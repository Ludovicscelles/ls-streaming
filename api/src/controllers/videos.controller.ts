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
