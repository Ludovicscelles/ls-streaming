import { RequestHandler } from "express";

export function makeDeleteController(
  deleteFunction: (id: string) => Promise<void>,
  noFoundCode: string,
  label: string
): RequestHandler {
  return async (req, res) => {
    const { id } = req.params;

    if (!id || typeof id !== "string" || !id.trim()) {
      return res
        .status(400)
        .json({ error: "Missing or invalid 'id' parameter." });
    }

    try {
      await deleteFunction(id.trim());
      return res.status(204).send();
    } catch (error: any) {
      if (error.code === noFoundCode) {
        return res.status(404).json({ error: `${label} not found.` });
      }
      return res.status(500).json({ error: "Internal server error." });
    }
  };
}
