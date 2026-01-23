import { Router } from "express";
import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import {
  getAllVideosController,
  searchAllVideosController,
  getAllTvShowsController,
  getTvShowByIdController,
  getEpisodesByTvShowIdController,
  getTvShowsByGenreController,
  createTvShowController,
  createSeasonTvShowController,
  updateTvShowController,
  deleteTvShowController,
  searchTvShowsController,
} from "../controllers";

export function createVideosRouter(movieLibrary: MovieLibraryFacade): Router {
  const router = Router();

  // Route to get all videos
  router.get("/", getAllVideosController(movieLibrary));

  // Route to get all TV shows
  router.get("/tvshows", getAllTvShowsController(movieLibrary));

  // Route to filter tv shows by genre
  router.get("/tvshows/genre", getTvShowsByGenreController(movieLibrary));

  // Route to create a new tv show
  router.post("/tvshows", createTvShowController(movieLibrary));

  // Route to add a new season to an existing tv show
  router.post(
    "/tvshows/:id/seasons",
    createSeasonTvShowController(movieLibrary),
  );

  // Route to update a tv show
  router.patch("/tvshows/:id", updateTvShowController(movieLibrary));

  // Route to delete a tv show
  router.delete("/tvshows/:id", deleteTvShowController(movieLibrary));

  // Route to search all videos by title across all categories
  router.get("/search", searchAllVideosController(movieLibrary));

  // Route to get tv-show by ID
  router.get("/tvshows/:id", getTvShowByIdController(movieLibrary));

  // Route to get episodes of a tv-show by tv-show ID
  router.get(
    "/tvshows/:id/episodes",
    getEpisodesByTvShowIdController(movieLibrary),
  );

  // Return the configured router
  return router;
}
