import { RequestHandler } from "express";

// Factory: returns an Express request handler that gets all items.
// <T> represents the item type returned by the provided getAll function.
// "label" is used for logging purposes (e.g., "films", "series").
export function makeGetAllVideosController<T>(
  getAllFunction: () => Promise<T[]>,
  label: string
): RequestHandler {
  return async (req, res) => {
    try {
      const results = await getAllFunction();
      return res.status(200).json(results);
    } catch (error) {
      console.error(`Error getting all ${label}:`, error);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
}

