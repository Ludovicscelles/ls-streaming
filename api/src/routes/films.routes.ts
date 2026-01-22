import { Router } from "express";
import { MovieLibraryFacade } from "../repositories/movieLibrary.facade";
import {
  getAllFilmsController,
  getFilmByIdController,
  getFilmsByGenreController,
  createFilmController,
  updateFilmController,
  deleteFilmController,
  searchFilmsController,
} from "../controllers";

export function createFilmsRouter(movieLibrary: MovieLibraryFacade): Router {
  const router = Router();

  // Route to search films
  router.get("/search", searchFilmsController(movieLibrary));

  // Route to filter films by genre
  router.get("/genre", getFilmsByGenreController(movieLibrary));

  // Route to get all films
  router.get("/", getAllFilmsController(movieLibrary));

  // Route to create a new film
  router.post("/", createFilmController(movieLibrary));

  // Route to get a film by ID
  router.get("/:id", getFilmByIdController(movieLibrary));

  // Route to update an existing film
  router.put("/:id", updateFilmController(movieLibrary));

  // Route to delete a film
  router.delete("/:id", deleteFilmController(movieLibrary));

  return router;
}
