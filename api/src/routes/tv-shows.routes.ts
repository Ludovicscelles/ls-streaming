import { Router } from "express";
import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import {
  getAllTvShowsController,
  getTvShowByIdController,
  getTvShowsByGenreController,
  getEpisodesByTvShowIdController,
  createTvShowController,
  createSeasonTvShowController,
  updateTvShowController,
  deleteTvShowController,
  searchTvShowsController,
} from "../controllers";

export function createTvShowsRouter(movieLibrary: MovieLibraryFacade): Router {
  const router = Router();

  // Route to search TV shows by title
  router.get("/search", searchTvShowsController(movieLibrary));

  // Route to filter TV shows by genre
  router.get("/genre", getTvShowsByGenreController(movieLibrary));

  // Route to get all TV shows
  router.get("/", getAllTvShowsController(movieLibrary));

  // Route to create a new TV show
  router.post("/", createTvShowController(movieLibrary));

  // Route to create a new season for a TV show
  router.post("/:id/seasons", createSeasonTvShowController(movieLibrary));

  // Route to update a TV show
  router.patch("/:id", updateTvShowController(movieLibrary));

  // Route to delete a TV show
  router.delete("/:id", deleteTvShowController(movieLibrary));

  // Route to get episodes of a TV show by ID
  router.get("/:id/episodes", getEpisodesByTvShowIdController(movieLibrary));

  // Route to get TV show by ID
  router.get("/:id", getTvShowByIdController(movieLibrary));

  return router;
}
