import { RequestHandler } from "express";

export function makeCreateWithIdParamController<TBody, TResult>(
  idParamName: string,
  createFunction: (id: string, data: TBody) => Promise<TResult>,
  label: string,
): RequestHandler {
  return async (req, res, next) => {
    const id = req.params[idParamName];

    if (!id) {
      return res
        .status(400)
        .json({ error: `Missing '${idParamName}' route parameter` });
    }

    const data = req.body as TBody;
    if (!data || Object.keys(data as any).length === 0) {
      return res
        .status(400)
        .json({ error: "Request body is missing or empty" });
    }

    try {
      const created = await createFunction(id, data);
      return res.status(201).json({ [label]: created });
    } catch (error: any) {
      if (error.code === "SQLITE_CONSTRAINT") {
        return res
          .status(409)
          .json({ error: `${label} already exists or constraint violation` });
      }
      if (
        error.code === "NOT_FOUND" ||
        error.code === "SERIE_NOT_FOUND" ||
        error.code === "TV_SHOW_NOT_FOUND"
      ) {
        return res.status(404).json({ error: error.message });
      }
      return next(error);
    }
  };
}
