import { Router } from "express";
import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import { createFilmsRouter } from "./films.routes";
import { createDocumentariesRouter } from "./documentaries.routes";
import { createSeriesRouter } from "./series.routes";

export function createApiRouter(movieLibrary: MovieLibraryFacade): Router {
  const router = Router();

  // Mount the films router at the /films path
  router.use("/films", createFilmsRouter(movieLibrary));
  // Mount the documentaries router at the /documentaries path
  router.use("/documentaries", createDocumentariesRouter(movieLibrary));
  // Mount the series router at the /series path
  router.use("/series", createSeriesRouter(movieLibrary));

  return router;
}
