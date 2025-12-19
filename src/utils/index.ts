import type { Request } from "express";

export const paginationParams = (req: Request, limitDefault = 20) => {
  let page = Number(req.query.page) || 1;
  page = page < 1 ? 1 : page;
  let limit = Number(req.query.limit) || limitDefault;
  limit = limit < 1 ? limitDefault : limit;
  const query = req.query.q;
  return {
    page,
    limit,
    query,
  };
};
