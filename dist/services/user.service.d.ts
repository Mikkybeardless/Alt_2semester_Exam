import { type IUser } from "../database/schema/user.schema.js";
import type { queryType } from "../types/index.js";
interface UserApiResponse {
    data: IUser[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}
export declare const getAllUsers: (page?: number, limit?: number, query?: queryType) => Promise<UserApiResponse>;
export {};
//# sourceMappingURL=user.service.d.ts.map