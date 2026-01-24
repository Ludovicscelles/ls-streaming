import { RequestHandler } from "express";

// Factory: returns an Express request handler that searches items by title query param.
// <T> represents the item type returned by the provided search function.
// "label" is used for logging purposes (e.g., "films", "series").
export function makeSearchByTitleController<T>(
  searchFunction: (title: string) => Promise<T[]>,
  label: string
): RequestHandler {
  return async (req, res) => {
    const { title } = req.query;

    // Validate query param: must be a non-empty string.
    if (!title || typeof title !== "string" || !title.trim()) {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'title' query parameter." });
    }

    try {
      const results = await searchFunction(title.trim());
      return res.status(200).json(results);
    } catch (error) {
      console.error(`Error searching ${label} by title:`, error);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
}
