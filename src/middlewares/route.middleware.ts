import type { NextFunction, Request, Response } from "express";

export const generateMiddleware = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schema) {
      const result = schema.validate(req.body);
      if (result.error) {
        return res
          .status(400)
          .json({ message: "Validation Error", errors: result.error });
      }
    }

    next();
  };
};
