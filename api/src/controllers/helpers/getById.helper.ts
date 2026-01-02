import { RequestHandler } from "express";

// Factory: returns an Express request handler that gets all items.
// <T> represents the item type returned by the provided getAll function.
// "label" is used for logging purposes (e.g., "films", "series").
export function makeGetByIdController<T>(
  getById: (id: string) => Promise<T | null>,
  label: string
): RequestHandler {
  return async (req, res) => {
    const { id } = req.params;

    if (!id || typeof id !== "string") {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'id' route param" });
    }
    try {
      const result = await getById(id);

      if (!result) {
        return res.status(404).json({ error: `${label} not found` });
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error(`Error getting ${label} by ID:`, error);
      return res.status(500).json({ error: "Internal server error." });
    }
  };
}
