import { RequestHandler } from "express";

// Factory: returns an Express request handler that updates a item.
// <T> represents the item type returned by the provided update function.
// "label" is used for logging purposes (e.g., "film", "serie").
export function makeUpdateController<T>(
  updateFunction: (id: string, data: Partial<T>) => Promise<T>,
  notFoundCode: string,
  label: string
): RequestHandler {
  return async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Missing 'id' route param" });
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ error: "Request body is missing or empty" });
    }

    const data = req.body as Partial<T>;

    try {
      const updatedItem = await updateFunction(id, data);
      return res.json(updatedItem);
    } catch (error: any) {
      console.error(error);
      if (error?.code === notFoundCode) {
        return res.status(404).json({ error: `${label} not found` });
      }
      if (error?.code === "NO_VALID_FIELDS") {
        return res
          .status(400)
          .json({ error: "No valid update fields provided" });
      }
      return res.status(500).json({ error: "Server error" });
    }
  };
}
