import { Router } from "express";
import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import {
  getAllDocumentariesController,
  getDocumentaryByIdController,
  getDocumentariesByGenreController,
  createDocumentaryController,
  updateDocumentaryController,
  deleteDocumentaryController,
  searchDocumentariesController,
} from "../controllers";

export function createDocumentariesRouter(
  movieLibrary: MovieLibraryFacade,
): Router {
  const router = Router();

  // Route to search documentaries
  router.get("/search", searchDocumentariesController(movieLibrary));

  // Route to filter documentaries by genre
  router.get("/genre", getDocumentariesByGenreController(movieLibrary));

  // Route to get all documentaries
  router.get("/", getAllDocumentariesController(movieLibrary));

  // Route to create a new documentary
  router.post("/", createDocumentaryController(movieLibrary));

  // Route to get a documentary by ID
  router.get("/:id", getDocumentaryByIdController(movieLibrary));

  // Route to update an existing documentary
  router.put("/:id", updateDocumentaryController(movieLibrary));

  // Route to delete a documentary
  router.delete("/:id", deleteDocumentaryController(movieLibrary));

  return router;
}
