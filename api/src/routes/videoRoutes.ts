import { Router } from "express";
import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import {
  getAllVideosController,
  getAllSeriesController,
  getAllTvShowsController,
  getSerieByIdController,
  getTvShowByIdController,
  getEpisodesBySerieIdController,
  getEpisodesByTvShowIdController,
  getSeriesByGenreController,
  getTvShowsByGenreController,
  createSerieController,
  createSeasonController,
  createTvShowController,
  createSeasonTvShowController,
  updateSerieController,
  updateTvShowController,
  deleteSerieController,
  deleteTvShowController,
  searchSeriesController,
  searchSerieByEpisodeTitleController,
  searchEpisodesController,
  searchTvShowsController,
  searchAllVideosController,
} from "../controllers/videos.controller";

import {
  getAllFilmsController,
  getFilmByIdController,
  getFilmsByGenreController,
  createFilmController,
  updateFilmController,
  deleteFilmController,
  searchFilmsController,
  getAllDocumentariesController,
  getDocumentaryByIdController,
  getDocumentariesByGenreController,
  createDocumentaryController,
  updateDocumentaryController,
  deleteDocumentaryController,
  searchDocumentariesController,
} from "../controllers";

export function createVideoRouter(movieLibrary: MovieLibraryFacade): Router {
  const router = Router();

  // Route to get all videos
  router.get("/", getAllVideosController(movieLibrary));

  // Route to get all films
  router.get("/films", getAllFilmsController(movieLibrary));

  // Route to get all documentaries
  router.get("/documentaries", getAllDocumentariesController(movieLibrary));

  // Route to get all series
  router.get("/series", getAllSeriesController(movieLibrary));

  // Route to get all TV shows
  router.get("/tvshows", getAllTvShowsController(movieLibrary));

  // Route to filter films by genre
  router.get("/films/genre", getFilmsByGenreController(movieLibrary));

  // Route to filter documentaries by genre
  router.get(
    "/documentaries/genre",
    getDocumentariesByGenreController(movieLibrary),
  );

  // Route to filter series by genre
  router.get("/series/genre", getSeriesByGenreController(movieLibrary));

  // Route to filter tv shows by genre
  router.get("/tvshows/genre", getTvShowsByGenreController(movieLibrary));

  // Route to create a new film
  router.post("/films", createFilmController(movieLibrary));

  // Route to create a new documentary
  router.post("/documentaries", createDocumentaryController(movieLibrary));

  // Route to create a new serie
  router.post("/series", createSerieController(movieLibrary));

  // Route to create a new season for a serie
  router.post("/series/:id/seasons", createSeasonController(movieLibrary));

  // Route to create a new tv show
  router.post("/tvshows", createTvShowController(movieLibrary));

  // Route to add a new season to an existing tv show
  router.post(
    "/tvshows/:id/seasons",
    createSeasonTvShowController(movieLibrary),
  );

  // Route to update a film
  router.patch("/films/:id", updateFilmController(movieLibrary));

  // Route to update a documentary
  router.patch("/documentaries/:id", updateDocumentaryController(movieLibrary));

  // Route to update a serie
  router.patch("/series/:id", updateSerieController(movieLibrary));

  // Route to update a tv show
  router.patch("/tvshows/:id", updateTvShowController(movieLibrary));

  // Route to delete a film
  router.delete("/films/:id", deleteFilmController(movieLibrary));

  // Route to delete a documentary
  router.delete(
    "/documentaries/:id",
    deleteDocumentaryController(movieLibrary),
  );

  // Route to delete a serie
  router.delete("/series/:id", deleteSerieController(movieLibrary));

  // Route to delete a tv show
  router.delete("/tvshows/:id", deleteTvShowController(movieLibrary));

  // Route to search film by title
  router.get("/films/search", searchFilmsController(movieLibrary));

  // Route to search documentary by title
  router.get(
    "/documentaries/search",
    searchDocumentariesController(movieLibrary),
  );

  // Route to search serie by title
  router.get("/series/search", searchSeriesController(movieLibrary));

  // Route to search serie by episode title
  router.get(
    "/series/search-by-episode",
    searchSerieByEpisodeTitleController(movieLibrary),
  );

  // Route to search episodes by title
  router.get("/episodes/search", searchEpisodesController(movieLibrary));

  // Route to search tv-show by title
  router.get("/tvshows/search", searchTvShowsController(movieLibrary));

  // Route to search all videos by title across all categories
  router.get("/search", searchAllVideosController(movieLibrary));

  // Route to get film by ID
  router.get("/films/:id", getFilmByIdController(movieLibrary));

  // Route to get documentary by ID
  router.get("/documentaries/:id", getDocumentaryByIdController(movieLibrary));

  // Route to get serie by ID
  router.get("/series/:id", getSerieByIdController(movieLibrary));

  // Route to get tv-show by ID
  router.get("/tvshows/:id", getTvShowByIdController(movieLibrary));

  // Route to get episodes of a serie by serie ID
  router.get(
    "/series/:id/episodes",
    getEpisodesBySerieIdController(movieLibrary),
  );

  // Route to get episodes of a tv-show by tv-show ID
  router.get(
    "/tvshows/:id/episodes",
    getEpisodesByTvShowIdController(movieLibrary),
  );

  // Return the configured router
  return router;
}
