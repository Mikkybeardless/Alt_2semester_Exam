import type { NextFunction } from "express";

import type { Request, Response } from "express";

export function asyncMiddleware(
  handler: (req: Request, res: Response) => Promise<void>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
}

// module.exports = asyncMiddleware;
