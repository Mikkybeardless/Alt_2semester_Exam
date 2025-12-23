import { type IBlog } from "../database/schema/blog.schema.js";
import type { BlogCreateDto, IdType, queryType } from "../types/index.js";
interface BlogApiResponse {
    data: IBlog[];
    meta: {
        page: number;
        limit: number;
        total: number;
    };
}
export declare const create: (blog: BlogCreateDto, content: string, userId: string) => Promise<IBlog>;
export declare const getAllBlogs: (page: number, limit: number, query?: queryType) => Promise<BlogApiResponse>;
export declare const getBlogByState: (page: number | undefined, limit: number | undefined, query: queryType, blogState: BlogCreateDto["state"]) => Promise<BlogApiResponse>;
export declare const getBlogById: (blogId: IdType) => Promise<IBlog | null>;
export declare const getOwnerBlogs: (page: number | undefined, limit: number | undefined, query: queryType, ownerId: IdType) => Promise<BlogApiResponse>;
export declare const publishBlog: (blogId: IdType) => Promise<IBlog | null>;
export declare const updateBlog: (blogId: IdType, blog: Partial<BlogCreateDto>) => Promise<IBlog | null>;
export declare const deleteBlog: (blogId: IdType) => Promise<IBlog | null>;
export {};
//# sourceMappingURL=blog.service.d.ts.map