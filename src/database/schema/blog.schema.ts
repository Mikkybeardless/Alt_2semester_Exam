import mongoose, { Document, Model } from "mongoose";

// Define interface for the document
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

// Define interface for instance methods
interface IBlogMethods {
  read(): Promise<IBlog & Document>;
}

// Create a type that combines the document with methods
type BlogModel = Model<IBlog, {}, IBlogMethods>;

const blogSchema = new mongoose.Schema<IBlog, BlogModel, IBlogMethods>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    state: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    read_count: {
      type: Number,
      default: 0,
    },
    reading_time: {
      type: Number,
      default: 0,
    },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

// Define the method with proper typing
blogSchema.methods.read = async function (
  this: IBlog & Document
): Promise<IBlog & Document> {
  this.read_count++;
  await this.save();
  return this;
};

export const Blog = mongoose.model<IBlog, BlogModel>("blogs", blogSchema);
