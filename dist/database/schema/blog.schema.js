import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
});
// Define the method with proper typing
blogSchema.methods.read = async function () {
    this.read_count++;
    await this.save();
    return this;
};
export const Blog = mongoose.model("blogs", blogSchema);
//# sourceMappingURL=blog.schema.js.map