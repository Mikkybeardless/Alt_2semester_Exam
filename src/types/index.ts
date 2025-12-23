import type { Types } from "mongoose";
import type { ParsedQs } from "qs";

export type BlogState = "draft" | "published";
export type queryType =
  | string
  | ParsedQs
  | (string | ParsedQs)[]
  | undefined
  | null;
export interface BlogCreateDto {
  title: string;
  description: string;
  author: string;
  body: string;
  owner: string;
  read_count: number;
  reading_time: number;
  tag: string[];
  state: BlogState;
}

export type IdType = Types.ObjectId;

export interface SignupDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role?: "USER" | "ADMIN";
}
