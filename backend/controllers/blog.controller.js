import Blog from "../models/blog.model.js";

// export const createBlog = async (req, res) => {
//   try {
//     const { title, description, category } = req.body;
//     if (!title || !description || !category) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const blog = new Blog({ title, description, category });
//     await blog.save();
//     return res.status(201).json({ message: "Blog created successfully", blog });
//   } catch (error) {
//     console.log("errror : ", error);
//     return res.status(500).json({ message: "Error creating blog" });
//   }
// };

// // export const getBlogs = async (req, res) => {
// //   try {
// //     const blogs = await Blog.find();
// //     return res
// //       .status(200)
// //       .json({ message: "Blogs fetched successfully", blogs });
// //   } catch (error) {
// //     console.log("errror : ", error);
// //     return res.status(500).json({ message: "Error fetching blogs" });
// //   }
// // };

// export const getBlogs = async (req, res) => {
//   try {
//     const page = Number(req.query.page) || 1;
//     const limit = 6;
//     const skip = (page - 1) * limit;

//     const blogs = await Blog.find().skip(skip).limit(limit);
//     const blogsCount = await Blog.countDocuments();

//     return res
//       .status(200)
//       .json({ message: "Blogs fetched successfully", blogs,blogsCount });
//   } catch (error) {
//     console.log("error: ", error);
//     return res.status(500).json({ message: "Error fetching blogs" });
//   }
// };

// export const updateBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { title, description, category } = req.body;

//     if (!title || !description || !category) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const blog = await Blog.findById(id);

//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     blog.title = title;
//     blog.description = description;
//     blog.category = category;

//     await blog.save();

//     return res.status(200).json({ message: "Blog updated successfully", blog });
//   } catch (error) {
//     console.log("error : ", error);
//     return res.status(500).json({ message: "Error updating blog" });
//   }
// };

// export const deleteBlog = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const blog = await Blog.findByIdAndDelete(id);
//     if (!blog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }
//     return res.status(200).json({ message: "Blog deleted successfully" });
//   } catch (error) {
//     console.log("error : ", error);
//     return res.status(500).json({ message: "Error deleting blog" });
//   }
// };
