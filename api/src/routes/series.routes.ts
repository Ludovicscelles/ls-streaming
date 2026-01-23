import { Router } from "express";
import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import {
  getAllSeriesController,
  getSerieByIdController,
  getSeriesByGenreController,
  getEpisodesBySerieIdController,
  createSerieController,
  createSeasonController,
  updateSerieController,
  deleteSerieController,
  searchSeriesController,
  searchEpisodesController,
  searchSerieByEpisodeTitleController,
} from "../controllers";

export function createSeriesRouter(movieLibrary: MovieLibraryFacade): Router {
  const router = Router();

  // Route to search series by title
  router.get("/search", searchSeriesController(movieLibrary));

  // Route to search serie by episode title
  router.get(
    "/search-by-episode",
    searchSerieByEpisodeTitleController(movieLibrary),
  );

  // Route to search episodes by title
  router.get("/episodes/search", searchEpisodesController(movieLibrary));

  // Route to filter series by genre
  router.get("/genre", getSeriesByGenreController(movieLibrary));

  // Route to get all series
  router.get("/", getAllSeriesController(movieLibrary));

  // Route to create a new serie
  router.post("/", createSerieController(movieLibrary));

  // Route to create a new season for a serie
  router.post("/:id/seasons", createSeasonController(movieLibrary));

  // Route to update a serie
  router.patch("/:id", updateSerieController(movieLibrary));

  // Route to delete a serie
  router.delete("/:id", deleteSerieController(movieLibrary));

    // Route to get episodes of a serie by ID
  router.get(
    "/:id/episodes",
    getEpisodesBySerieIdController(movieLibrary),
  );

  // Route to get serie by ID
  router.get("/:id", getSerieByIdController(movieLibrary));

  return router;
}
