import type { Request } from "express";
export declare const paginationParams: (req: Request, limitDefault?: number) => {
    page: number;
    limit: number;
    query: string | import("qs").ParsedQs | (string | import("qs").ParsedQs)[] | undefined;
};
//# sourceMappingURL=index.d.ts.map