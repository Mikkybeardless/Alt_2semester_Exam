import type { NextFunction } from "express";
import type { Request, Response } from "express";
export declare function asyncMiddleware(handler: (req: Request, res: Response) => Promise<void>): (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=async.middleware.d.ts.map