import { Router } from "express";
import { MovieLibraryRepository } from "../MovieLibraryRepository";
import { getAllVideosController } from "../controllers/controller";

export function createVideoRouter(
  movieLibrary: MovieLibraryRepository
): Router {
  const router = Router();

  // Route to get all videos
  router.get("/", getAllVideosController(movieLibrary));

  // Route to get all films
  router.get("/films", async (req, res) => {
    const films = await movieLibrary.getAllFilms();
    return res.json(films);
  });

  // Route to get all documentaries
  router.get("/documentaries", async (req, res) => {
    const documentaries = await movieLibrary.getAllDocumentaries();
    return res.json(documentaries);
  });

  // Route to get all series
  router.get("/series", async (req, res) => {
    const series = await movieLibrary.getAllSeries();
    return res.json(series);
  });

  // Route to get all TV shows
  router.get("/tvshows", async (req, res) => {
    const tvshows = await movieLibrary.getAllTvShows();
    return res.json(tvshows);
  });

  // Route to filter films by genre
  router.get("/films/genre", async (req, res) => {
    const { genre } = req.query;

    if (!genre || typeof genre !== "string") {
      return res
        .status(400)
        .json({ error: `Missing or invalid 'genre' query param` });
    }

    const filmsByGenre = await movieLibrary.getFilmsByGenre(genre);

    if (filmsByGenre.length === 0) {
      return res
        .status(404)
        .json({ error: `Films not found for genre ${genre}` });
    }

    return res.json(filmsByGenre);
  });

  // Route to filter documentaries by genre

  router.get("/documentaries/genre", async (req, res) => {
    const { genre } = req.query;

    if (!genre || typeof genre !== "string") {
      return res
        .status(400)
        .json({ error: `Missing or invalid 'genre' query param` });
    }

    const documentariesByGenre =
      await movieLibrary.getDocumentariesByGenre(genre);

    if (documentariesByGenre.length === 0) {
      return res
        .status(404)
        .json({ error: `Documentaries not found for genre ${genre}` });
    }

    return res.json(documentariesByGenre);
  });

  // Route to filter series by genre

  router.get("/series/genre", async (req, res) => {
    const { genre } = req.query;

    if (!genre || typeof genre !== "string") {
      return res
        .status(400)
        .json({ error: `Missing or invalid 'genre' query param` });
    }

    const seriesByGenre = await movieLibrary.getSeriesByGenre(genre);

    if (seriesByGenre.length === 0) {
      return res
        .status(404)
        .json({ error: `Series not found for genre ${genre}` });
    }

    return res.json(seriesByGenre);
  });

  // Route to filter tv shows by genre

  router.get("/tvshows/genre", async (req, res) => {
    const { genre } = req.query;

    if (!genre || typeof genre !== "string") {
      return res
        .status(400)
        .json({ error: `Missing or invalid 'genre' query param` });
    }

    const tvShowsByGenre = await movieLibrary.getTvShowsByGenre(genre);

    if (tvShowsByGenre.length === 0) {
      return res
        .status(404)
        .json({ error: `Tv show not found for genre ${genre}` });
    }

    return res.json(tvShowsByGenre);
  });

  // Route to create a new film
  router.post("/films", async (req, res) => {
    try {
      const film = await movieLibrary.createFilm(req.body);
      return res.status(201).json(film);
    } catch (error: any) {
      if (error.code === "SQLITE_CONSTRAINT") {
        return res
          .status(409)
          .json({ error: "Film with this ID already exists" });
      }
      return res.status(400).json({ error: "Invalid film data" });
    }
  });

  // Route to create a new documentary
  router.post("/documentaries", async (req, res) => {
    try {
      const documentary = await movieLibrary.createDocumentary(req.body);
      return res.status(201).json(documentary);
    } catch (error: any) {
      // Handle unique constraint violation (e.g., duplicate ID)
      // SQLITE_CONSTRAINT is the error code for SQLite, adjust if using a different DBMS (Database Management System).
      if (error.code === "SQLITE_CONSTRAINT") {
        return (
          res
            // error 409 indicates a conflict, such as a duplicate resource
            .status(409)
            .json({ error: "Documentary with this ID already exists" })
        );
      }
      return res.status(400).json({ error: "Invalid documentary data" });
    }
  });

  // Route to create a new serie
  router.post("/series", async (req, res) => {
    try {
      const serie = await movieLibrary.createSerie(req.body);
      return res.status(201).json(serie);
    } catch (error: any) {
      console.error(error);
      if (error.code === "SQLITE_CONSTRAINT") {
        return res
          .status(409)
          .json({ error: "Serie with this ID already exists" });
      }
      return res.status(400).json({ error: "Invalid serie data" });
    }
  });

  // Route to create a new tv show
  router.post("/tvshows", async (req, res) => {
    try {
      const tvShow = await movieLibrary.createTvShow(req.body);
      return res.status(201).json(tvShow);
    } catch (error: any) {
      console.error(error);
      if (error.code === "SQLITE_CONSTRAINT") {
        return res
          .status(409)
          .json({ error: "Tv show with this ID already exists" });
      }
      return res.status(400).json({ error: "Invalid tv show data" });
    }
  });

  // Route to update a film
  router.patch("/films/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing 'id' route param" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    try {
      const updatedFilm = await movieLibrary.updateFilm(id, req.body);
      return res.json(updatedFilm);
    } catch (error: any) {
      console.error(error);
      // Handle case where film to update is not found
      // Assuming the MovieLibraryRepository throws an error with code "FILM_NOT_FOUND" in such cases
      if (error?.code === "FILM_NOT_FOUND") {
        return res.status(404).json({ error: "Film not found" });
      }
      if (error?.code === "NO_VALID_FIELDS") {
        return res
          .status(400)
          .json({ error: "No valid update fields provided" });
      }
      return res.status(500).json({ error: "Server error" });
    }
  });

  // Route to update a documentary
  router.patch("/documentaries/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing 'id' route param" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    try {
      const updatedDocumentary = await movieLibrary.updateDocumentary(
        id,
        req.body
      );
      return res.json(updatedDocumentary);
    } catch (error: any) {
      console.error(error);
      if (error?.code === "DOCUMENTARY_NOT_FOUND") {
        return res.status(404).json({ error: "Documentary not found" });
      }
      if (error?.code === "NO_VALID_FIELDS") {
        return res
          .status(400)
          .json({ error: "No valid update fields provided" });
      }
      return res.status(500).json({ error: "Server error" });
    }
  });

  // Route to update a serie
  router.patch("/series/:id", async (req, res) => {
    const { id } = req.params;

    // Validate the 'id' param
    if (!id) {
      return res.status(400).json({ error: "Missing 'id' param" });
    }

    // Validate that there is at least one field to update
    // to prevent empty updates
    // for this, we use Object.keys to check if req.body has any keys
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    // Attempt to update the serie
    // and handle potential errors
    try {
      // Call the updateSerie method from the repository
      const updatedSerie = await movieLibrary.updateSerie(id, req.body);
      // Return the updated serie
      return res.json(updatedSerie);
      // Catch errors during the update process
    } catch (error: any) {
      // Check if the error indicates that the serie was not found
      if (error?.code === "SERIE_NOT_FOUND") {
        return res.status(404).json({ error: "Serie not found" });
      }
      // Check if the error indicates no valid fields were provided for update
      if (error?.code === "NO_VALID_FIELDS") {
        return res
          .status(400)
          .json({ error: "No valid update fields provided" });
      }
      // For other errors, return a generic invalid data error
      return res.status(500).json({ error: "Server error" });
    }
  });

  // Route to update a tv show

  router.patch("/tvshows/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing 'id' param" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "No update data provided" });
    }

    try {
      const updatedTvShow = await movieLibrary.updateTvShow(id, req.body);
      return res.json(updatedTvShow);
    } catch (error: any) {
      if (error?.code === "TV_SHOW_NOT_FOUND") {
        return res.status(404).json({ error: "Tv show not found" });
      }
      if (error?.code === "NO_VALID_FIELDS") {
        return res
          .status(400)
          .json({ error: "No valid update fields provided" });
      }
      return res.status(500).json({ error: "Server error" });
    }
  });

  // Route to search film by title
  router.get("/films/search", async (req, res) => {
    const { title } = req.query;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'title' query param" });
    }
    const films = await movieLibrary.searchFilms(title);
    return res.json(films);
  });

  // Route to search documentary by title
  router.get("/documentaries/search", async (req, res) => {
    const { title } = req.query;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'title' query param" });
    }
    const documentaries = await movieLibrary.searchDocumentaries(title);
    return res.json(documentaries);
  });

  // Route to search serie by title
  router.get("/series/search", async (req, res) => {
    const { title } = req.query;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'title' query param" });
    }
    const series = await movieLibrary.searchSeries(title);
    return res.json(series);
  });

  // Route to search episodes in series by title
  router.get("/episodes/search", async (req, res) => {
    const { title } = req.query;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'title' query param" });
    }
    const episodes = await movieLibrary.searchEpisodesInSeriesByTitle(title);
    return res.json(episodes);
  });

  // Route to search episodes in series by title with query builder

  router.get("/series/search-by-episode", async (req, res) => {
    const { title } = req.query;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'title' query param" });
    }
    const episodes = await movieLibrary.searchSerieByEpisodeTitle(title);
    return res.json(episodes);
  });

  // Route to search tv-show by title

  router.get("/tvshows/search", async (req, res) => {
    const { title } = req.query;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: `Missing or invalid 'title' query param` });
    }
    const tvShows = await movieLibrary.searchTvShows(title);
    return res.json(tvShows);
  });

  // Route to search all videos by title across all categories

  router.get("/search", async (req, res) => {
    const { title } = req.query;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'title' query param" });
    }
    const videos = await movieLibrary.searchAllVideosByTitle(title);
    return res.json(videos);
  });

  // Route to get film by ID
  router.get("/films/:id", async (req, res) => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'id' route param" });
    }
    const film = await movieLibrary.getFilmById(id);

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }
    return res.json(film);
  });

  // Route to get documentary by ID

  router.get("/documentaries/:id", async (req, res) => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: `Missing or invalid 'id' route param` });
    }

    const documentary = await movieLibrary.getDocumentaryById(id);

    if (!documentary) {
      return res.status(404).json({ error: "Documentary not found" });
    }
    return res.json(documentary);
  });

  // Route to get serie by ID

  router.get("/series/:id", async (req, res) => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: `Missing or invalid 'id' route param` });
    }

    const serie = await movieLibrary.getSerieById(id);

    if (!serie) {
      return res.status(404).json({ error: "Serie not found" });
    }
    return res.json(serie);
  });

  // Route to get tv-show by ID

  router.get("/tvshows/:id", async (req, res) => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: `Missing or invalid 'id' route param` });
    }

    const tvshow = await movieLibrary.getTvShowById(id);

    if (!tvshow) {
      return res.status(404).json({ error: "Tv-show not found" });
    }
    return res.json(tvshow);
  });

  // Return the configured router
  return router;
}
