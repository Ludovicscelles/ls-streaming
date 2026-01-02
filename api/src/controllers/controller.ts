import { Request, Response, RequestHandler } from "express";
import { MovieLibraryRepository } from "../MovieLibraryRepository";
import { makeSearchByTitleController } from "./helpers/searchByTitle.helper";
import { makeGetAllVideosController } from "./helpers/getAll.helper";
import { makeGetByIdController } from "./helpers/getById.helper";

// controller to get all videos
export const getAllVideosController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllVideos(),
    "videos"
  );
};

// controller to get all films
export const getAllFilmsController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetAllVideosController(() => movieLibrary.getAllFilms(), "films");
};

// controller to get all documentaries
export const getAllDocumentariesController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllDocumentaries(),
    "documentaries"
  );
};

// controller to get all series
export const getAllSeriesController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllSeries(),
    "series"
  );
};

// controller to get all tv shows
export const getAllTvShowsController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetAllVideosController(
    () => movieLibrary.getAllTvShows(),
    "tv shows"
  );
};

// controller to get film by ID
export const getFilmByIdController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getFilmById(id),
    "film"
  );
};

// controller to get documentary by ID
export const getDocumentaryByIdController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getDocumentaryById(id),
    "documentary"
  );
};

// controller to get serie by ID
export const getSerieByIdController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getSerieById(id),
    "serie"
  );
};

// controller to get tv show by ID
export const getTvShowByIdController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeGetByIdController(
    (id: string) => movieLibrary.getTvShowById(id),
    "tv show"
  );
};

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

// Controller to filter tv shows by genre
export function getTvShowsByGenreController(
  movieLibrary: MovieLibraryRepository
): RequestHandler {
  return async (req: Request, res: Response): Promise<Response> => {
    const { genre } = req.query;

    if (!genre || typeof genre !== "string") {
      return res
        .status(400)
        .json({ error: `Missing or invalid 'genre' query parmam` });
    }

    try {
      const tvShowsByGenre = await movieLibrary.getTvShowsByGenre(genre);
      return res.json(tvShowsByGenre);
    } catch (error) {
      console.error(`Error fetching tv shows by ${genre} genre:`, error);
      return res.status(500).json({ error: `Internal Server Error` });
    }
  };
}

// Controller to search films by title
// Uses the factory function to create the controller
// that handles film search by title.
// Two parameters are passed:
// 1. The search function from the MovieLibraryRepository
// 2. A label "films" for logging purposes
export const searchFilmsController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchFilms(title),
    "films"
  );
};

// Controller to search documentaries by title
export const searchDocumentariesController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchDocumentaries(title),
    "documentaries"
  );
};

// Controller to search series by title
export const searchSeriesController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchSeries(title),
    "series"
  );
};

// Controller to search tv shows by titles
export const searchTvShowsController = (
  movieLibrary: MovieLibraryRepository
): RequestHandler => {
  return makeSearchByTitleController(
    (title: string) => movieLibrary.searchTvShows(title),
    "tv shows"
  );
};
