import express from "express";
const blogRouter = express.Router();
import upload from '../middleware/multer.js';



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
blogRouter.get("/:slug" ,  getBlogById);

blogRouter.post("/createBlog", auth(["ADMIN"]),  upload.single("image"),   // <-- multer processes file first
 uploadBlogImage, createBlog);
// router.put("/updateBlog/:id", updateBlog);
blogRouter.delete("/deleteBlog/:id",auth(["ADMIN"]), deleteBlog);

export default blogRouter;
