import { Router } from "express";
import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import { createFilmsRouter } from "./films.routes";

export function createApiRouter(movieLibrary: MovieLibraryFacade): Router {
  const router = Router();

  // Mount the films router at the /films path
  router.use("/films", createFilmsRouter(movieLibrary));

  return router;
} 