import { Router } from "express";
import { MovieLibraryRepository } from "../MovieLibraryRepository";

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

  // Route to search film by title
  router.get("/films/search", async (req, res) => {
    const { title } = req.query;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Missing our invalid 'title' query param" });
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

  // Return the configured router
  return router;
}
