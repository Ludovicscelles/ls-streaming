import { Router } from "express";
import movieLibrary from "../initiateData";

const videoRouter = Router();

videoRouter.get("/", (req, res) => {
  res.json(movieLibrary.getAll());
});

videoRouter.get("/films", (req, res) => {
  const film = movieLibrary
    .getAll()
    .filter((v) => v.constructor.name === "Film");
  res.json(film);
});

videoRouter.get("/documentaries", (req, res) => {
  const documentaries = movieLibrary
    .getAll()
    .filter((v) => v.constructor.name === "Documentary");
  res.json(documentaries);
});

videoRouter.get("/series", (req, res) => {
  const series = movieLibrary
    .getAll()
    .filter((v) => v.constructor.name === "Serie");
  res.json(series);
});

videoRouter.get("/tvShows", (req, res) => {
  const tvShows = movieLibrary
    .getAll()
    .filter((v) => v.constructor.name === "TvShow");
  res.json(tvShows);
});

export default videoRouter;
