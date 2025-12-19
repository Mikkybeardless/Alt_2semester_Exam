import type { Request, Response } from "express";
export declare const createBlog: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllBlogs: (req: Request, res: Response) => Promise<void>;
export declare const getPublishedBlogs: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getDraftBlogs: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getPublishedBlogById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getBlogsByOwnerId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const publishBlog: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateBlog: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteBlog: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=blog.controller.d.ts.map