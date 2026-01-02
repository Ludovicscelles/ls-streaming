import { RequestHandler } from "express";

// Factory: returns an Express request handler that creates a new item.
// <T> represents the item type returned by the provided create function.
// "label" is used for logging purposes (e.g., "film", "series").
export function makeCreateController<T>(
  createFunction: (data: Partial<T>) => Promise<T>,
  label: string
): RequestHandler {
  return async (req, res) => {
    const data = req.body as Partial<T>;

    if (!data || Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ error: "Request body is missing or empty" });
    }

    try {
      const createdItem = await createFunction(data);
      return res.status(201).json(createdItem);
    } catch (error: any) {
      if (error.code === "SQLITE_CONSTRAINT") {
        return res
          .status(409)
          .json({ error: `${label} with this ID already exists` });
      }
      return res.status(500).json({ error: `Internal server error.` });
    }
  };
}
