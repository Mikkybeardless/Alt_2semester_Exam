import mongoose, { Document, Model } from "mongoose";
export interface IBlog {
    title: string;
    description: string;
    author: string;
    body: string;
    owner: mongoose.Types.ObjectId;
    state: "draft" | "published";
    read_count: number;
    reading_time: number;
    tags: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
interface IBlogMethods {
    read(): Promise<IBlog & Document>;
}
type BlogModel = Model<IBlog, {}, IBlogMethods>;
export declare const Blog: BlogModel;
export {};
//# sourceMappingURL=blog.schema.d.ts.map