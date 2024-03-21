import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blogName: {
      type: String,
      required: true,
    },
    blogPlaces: {
      type: String,
      required: true,
    },
    bloggerName: {
      type: String,
      required: true,
    },
    blogContent: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


const Blog = mongoose.model("Blog", blogSchema);

export default Blog;