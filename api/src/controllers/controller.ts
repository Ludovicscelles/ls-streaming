import { Request, Response, RequestHandler } from "express";
import { MovieLibraryRepository } from "../MovieLibraryRepository";
import { ResolveFnOutput } from "module";

// controller to get all videos
export function getAllVideosController(
  // dependency injection of the MovieLibraryRepository
  // to be able to use its methods
  movieLibrary: MovieLibraryRepository
  // return a RequestHandler
  // which is a function that takes a Request and a Response
): RequestHandler {
  // return the RequestHandler
  // which is an async function that handles the request and response
  return async (req: Request, res: Response): Promise<Response> => {
    try {
      // use the movieLibrary to get all videos
      const videos = await movieLibrary.getAllVideos();
      // return the videos as a JSON response
      return res.json(videos);
      // handle errors appropriately
    } catch (error) {
      // log the error for debugging purposes
      console.error("Error fetching videos:", error);
      // return a 500 Internal Server Error response
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

// controller to get all films
export function getAllFilmsController(
  movieLibrary: MovieLibraryRepository
): RequestHandler {
  return async (req: Request, res: Response): Promise<Response> => {
    try {
      const films = await movieLibrary.getAllFilms();
      return res.json(films);
    } catch (error) {
      console.error("Error fetching films:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

// controller to get all documentaries
export function getAllDocumentariesController(
  movieLibrary: MovieLibraryRepository
): RequestHandler {
  return async (req: Request, res: Response): Promise<Response> => {
    try {
      const documentaries = await movieLibrary.getAllDocumentaries();
      return res.json(documentaries);
    } catch (error) {
      console.error("Error fetching documentaries:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

// controller to get all series
export function getAllSeriesController(
  movieLibrary: MovieLibraryRepository
): RequestHandler {
  return async (req: Request, res: Response): Promise<Response> => {
    try {
      const series = await movieLibrary.getAllSeries();
      return res.json(series);
    } catch (error) {
      console.error("Error fetching series:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
