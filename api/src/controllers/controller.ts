import { Request, Response, RequestHandler } from "express";
import { MovieLibraryRepository } from "../MovieLibraryRepository";
import { error } from "console";

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

// controller to get all tv shows
export function getAllTvShowsController(
  movieLibrary: MovieLibraryRepository
): RequestHandler {
  return async (req: Request, res: Response): Promise<Response> => {
    try {
      const tvShows = await movieLibrary.getAllTvShows();
      return res.json(tvShows);
    } catch (error) {
      console.error("Error fetching tv shows:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

// controller to get film by ID
export function getFilmByIdController(
  movieLibrary: MovieLibraryRepository
): RequestHandler {
  return async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'id' route param" });
    }

    try {
      const film = await movieLibrary.getFilmById(id);

      if (!film) {
        return res.status(404).json({ error: "Film not found" });
      }

      return res.json(film);
    } catch (error) {
      console.error("Error fetching film by ID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

// controller to get documentary by ID
export function getDocumentaryByIdController(
  movieLibrary: MovieLibraryRepository
): RequestHandler {
  return async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'id' route param" });
    }

    try {
      const documentary = await movieLibrary.getDocumentaryById(id);

      if (!documentary) {
        return res.status(404).json({ error: "Documentary not found" });
      }
      return res.json(documentary);
    } catch (error) {
      console.error("Error fetching documentary by ID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

// controller to get serie by ID
export function getSerieByIdController(
  movieLibrary: MovieLibraryRepository
): RequestHandler {
  return async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'id' route param" });
    }

    try {
      const serie = await movieLibrary.getSerieById(id);

      if (!serie) {
        return res.status(404).json({ error: "Serie not found" });
      }
      return res.json(serie);
    } catch (error) {
      console.error("Error fetching serie by ID:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

// controller to get tv show by ID
export function getTvShowByIdController(
  movieLibrary: MovieLibraryRepository
): RequestHandler {
  return async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'id' route param" });
    }

    try {
      const tvShow = await movieLibrary.getTvShowById(id);

      if (!tvShow) {
        return res.status(404).json({ error: "Tv show not found" });
      }
      return res.json(tvShow);
    } catch (error) {
      console.error("Error fetching tv show by ID", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

// controller to filter films by genre
export function getFilmsByGenreController(
  movieLibrary: MovieLibraryRepository
): RequestHandler {
  return async (req: Request, res: Response): Promise<Response> => {
    const { genre } = req.query;

    if (!genre || typeof genre !== "string") {
      return res
        .status(400)
        .json({ error: `Missing or invalid 'genre' query param` });
    }

    try {
      const filmsByGenre = await movieLibrary.getFilmsByGenre(genre);
      return res.json(filmsByGenre);
    } catch (error) {
      console.error(`Error fetching films by ${genre} genre:`, error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
}

// Controller to filter documentaries by genre
export function getDocumentariesByGenreController(
  movieLibrary: MovieLibraryRepository
): RequestHandler {
  return async (req: Request, res: Response): Promise<Response> => {
    const { genre } = req.query;

    if (!genre || typeof genre !== "string") {
      return res
        .status(400)
        .json({ error: `Missing or invalid 'genre' query param` });
    }

    try {
      const documentariesByGenre =
        await movieLibrary.getDocumentariesByGenre(genre);
      return res.json(documentariesByGenre);
    } catch (error) {
      console.error(`Error fetching documentaries by ${genre} genre:`, error);
      return res.status(500).json({ error: `Internal Server Error` });
    }
  };
}

// Controller to filter series by genre
export function getSeriesByGenreController(
  movieLibrary: MovieLibraryRepository
): RequestHandler {
  return async (req: Request, res: Response): Promise<Response> => {
    const { genre } = req.query;

    if (!genre || typeof genre !== "string") {
      return res
        .status(400)
        .json({ error: `Missing or invalid 'genre' query param` });
    }

    try {
      const seriesByGenre = await movieLibrary.getSeriesByGenre(genre);
      return res.json(seriesByGenre);
    } catch (error) {
      console.error(`Error fetching series by ${genre} genre:`, error);
      return res.status(500).json({ error: `Internal Server Error` });
    }
  };
}
