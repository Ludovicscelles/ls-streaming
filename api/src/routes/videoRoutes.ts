import { Router } from "express";
import { MovieLibraryRepository } from "../MovieLibraryRepository";
import { error } from "console";

export function createVideoRouter(
  movieLibrary: MovieLibraryRepository
): Router {
  const router = Router();

  // Route to get all videos
  router.get("/", async (req, res) => {
    const videos = await movieLibrary.getAllVideos();
    return res.json(videos);
  });

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
    } catch (error) {
      return res.status(400).json({ error: "Invalid film data" });
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
