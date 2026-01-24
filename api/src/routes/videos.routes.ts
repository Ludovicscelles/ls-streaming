import { Router } from "express";
import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import {
  getAllVideosController,
  searchAllVideosController,
} from "../controllers";

export function createVideosRouter(movieLibrary: MovieLibraryFacade): Router {
  const router = Router();

  // Route to get all videos
  router.get("/", getAllVideosController(movieLibrary));

  // Route to search all videos by title across all categories
  router.get("/search", searchAllVideosController(movieLibrary));

  // Return the configured router
  return router;
}
