import { Router } from "express";
import movieLibrary from "../initiateData";

const videoRouter = Router();

videoRouter.get("/", (req, res) => {
  res.json(movieLibrary.getAll());
});

videoRouter.get("/films", (req, res) => {
  res.json(movieLibrary.getAllFilms());
});

videoRouter.get("/documentaries", (req, res) => {
  res.json(movieLibrary.getAllDocumentaries());
});

videoRouter.get("/series", (req, res) => {
  res.json(movieLibrary.getAllSeries());
});

videoRouter.get("/tvShows", (req, res) => {
  res.json(movieLibrary.getAllTvShows());
});

export default videoRouter;
