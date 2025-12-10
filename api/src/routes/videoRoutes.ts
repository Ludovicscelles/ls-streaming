import { Router } from "express";
import { MovieLibraryRepository } from "../MovieLibraryRepository";

export function createVideoRouter(
  movieLibrary: MovieLibraryRepository
): Router {
  const router = Router();

  // Route to get all videos
  router.get("/", async (req, res) => {
    const videos = await movieLibrary.getAllVideos();
    res.json(videos);
  });

  // Route to get all films
  router.get("/films", async (req, res) => {
    const films = await movieLibrary.getAllFilms();
    res.json(films);
  });

  // Route to get all documentaries
  router.get("/documentaries", async (req, res) => {
    const documentaries = await movieLibrary.getAllDocumentaries();
    res.json(documentaries);
  });

  // Route to get all series
  router.get("/series", async (req, res) => {
    const series = await movieLibrary.getAllSeries();
    res.json(series);
  });

  // Route to get all TV shows
  router.get("/tvshows", async (req, res) => {
    const tvshows = await movieLibrary.getAllTvShows();
    res.json(tvshows);
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
    res.json(films);
  });

  // Route to search documentary by title

  router.get("/documentaries/search", async (req, res) => {
    const { title } = req.query;

    if (!title || typeof title !== "string") {
      return res
        .status(400)
        .json({ error: "Missing ou invalid 'title' query param" });
    }
    const documentaries = await movieLibrary.searchDocumentaries(title);
    res.json(documentaries);
  });

  // Return the configured router
  return router;
}
