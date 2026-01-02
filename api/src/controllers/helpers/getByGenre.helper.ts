import { RequestHandler } from "express";

// Factory: returns an Express request handler that gets items by genre.
// <T> represents the item type returned by the provided getByGenre function.
// "label" is used for logging purposes (e.g., "films", "series").
export function makeGetByGenreController<T>(
  getByGenre: (genre: string) => Promise<T[]>,
  label: string
): RequestHandler {
  return async (req, res) => {
    const { genre } = req.query;

    if (!genre || typeof genre !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'genre' query param" });
    }
    try {
      const results = await getByGenre(genre);
      return res.status(200).json(results);
    } catch (error) {
      console.error(`Error fetching ${label} by genre:`, error);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
}
