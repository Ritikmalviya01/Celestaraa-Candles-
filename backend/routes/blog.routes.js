import express from "express";
const blogRouter = express.Router();


import {
getAllBlogs,
  createBlog,
  uploadBlogImage,
  deleteBlog,
  getBlogById,
//   updateBlog,
//   deleteBlog,

} from "../controllers/blog.controller.js";
import { auth } from "../middleware/auth.js";

blogRouter.get("/blogs" ,  getAllBlogs);
blogRouter.get("/blog/:id" ,  getBlogById);

blogRouter.post("/createBlog", auth(["ADMIN"]), uploadBlogImage, createBlog);
// router.put("/updateBlog/:id", updateBlog);
blogRouter.delete("/deleteBlog/:id",auth(["ADMIN"]), deleteBlog);

export default blogRouter;
