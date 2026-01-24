import { Router } from "express";
import type { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import { createFilmsRouter } from "./films.routes";
import { createDocumentariesRouter } from "./documentaries.routes";
import { createSeriesRouter } from "./series.routes";
import { createTvShowsRouter } from "./tv-shows.routes";
import {
  getAllVideosController,
  searchAllVideosController,
} from "../controllers";

export function createApiRouter(movieLibrary: MovieLibraryFacade): Router {
  const router = Router();

  // Route to get all videos
  router.get("/", getAllVideosController(movieLibrary));
  // Route to search all videos by title across all categories
  router.get("/search", searchAllVideosController(movieLibrary));

  // Mount the films router at the /films path
  router.use("/films", createFilmsRouter(movieLibrary));
  // Mount the documentaries router at the /documentaries path
  router.use("/documentaries", createDocumentariesRouter(movieLibrary));
  // Mount the series router at the /series path
  router.use("/series", createSeriesRouter(movieLibrary));
  // Mount the tv-shows router at the /tv-shows path
  router.use("/tvshows", createTvShowsRouter(movieLibrary));

  return router;
}
