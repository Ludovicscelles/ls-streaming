import { Router } from "express";
import { MovieLibraryRepository } from "../MovieLibraryRepository";

export function createVideoRouter(movieLibrary: MovieLibraryRepository) {
  const router = Router();

  router.get("/", async (req, res) => {
    const videos = await movieLibrary.getAllVideos();
    res.json(videos);
  });
}
export default createVideoRouter;