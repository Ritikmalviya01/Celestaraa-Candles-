import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import Blog from "../models/blog.model.js";
import { v2 as cloudinary } from "cloudinary";
import { JSDOM } from "jsdom";
// Configure multer storage for featured image
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/blogs");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB file size limit
    fieldSize: 25 * 1024 * 1024, // 25MB field size limit (for large text content)
  }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed (jpeg, jpg, png, gif, webp)"));
    }
  },
});

// Export upload middleware
export const uploadBlogImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No featured image provided",
      });
    }

    // Wrap upload_stream in a Promise
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "blogs/featured" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(req.file.buffer); // write buffer to Cloudinary
    });

    req.featuredImageUrl = uploadResult.secure_url;
    next();

  } catch (error) {
    console.error("Upload Middleware Error:", error);
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};

// Helper function to extract and save base64 images from ReactQuill content


export const processQuillImages = async (content) => {
  const dom = new JSDOM(content);
  const document = dom.window.document;

  const images = document.querySelectorAll("img");

  for (let img of images) {
    const src = img.getAttribute("src");

    // Only process base64 images
    if (!src.startsWith("data:image")) continue;

    try {
      const uploadResponse = await cloudinary.uploader.upload(src, {
        folder: "blogs/content",
      });

      img.setAttribute("src", uploadResponse.secure_url);
    } catch (err) {
      console.error("Error uploading Quill image:", err);
    }
  }

  return document.body.innerHTML;
};



// Create Blog Controller
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content required",
      });
    }

    // Featured image URL from Cloudinary middleware
    const featuredImageUrl = req.featuredImageUrl;

    // Process quill images (your existing function)
    const processedContent = await processQuillImages(content);

    const blog = await Blog.create({
      title,
      content: processedContent,
      image: featuredImageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Blog created",
      blog,
    });

  } catch (error) {
    console.log("Error creating blog:", error);
    res.status(500).json({
      success: false,
      message: "Error creating blog",
    });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      blogs 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error fetching blogs" 
    });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({slug : req.params.slug});
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Blog not found" 
      });
    }
    res.status(200).json({ 
      success: true, 
      blog 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Error fetching blog" 
    });
  }
};

// Update blog
// export const updateBlog = async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const blogId = req.params.id;

//     const blog = await Blog.findById(blogId);
//     if (!blog) {
//       return res.status(404).json({ 
//         success: false, 
//         message: "Blog not found" 
//       });
//     }

//     // Process content for base64 images if content is being updated
//     let processedContent = content;
//     if (content) {
//       processedContent = await processQuillImages(content);
//     }

//     // Update featured image if new one is uploaded
//     let featuredImagePath = blog.image;
//     if (req.file) {
//       // Delete old image
//       const oldImagePath = path.join(process.cwd(), blog.image.substring(1));
//       if (fs.existsSync(oldImagePath)) {
//         fs.unlinkSync(oldImagePath);
//       }
//       featuredImagePath = `/uploads/blogs/${req.file.filename}`;
//     }

//     // Update blog
//     blog.title = title || blog.title;
//     blog.content = processedContent || blog.content;
//     blog.image = featuredImagePath;

//     await blog.save();

//     res.status(200).json({ 
//       success: true, 
//       message: "Blog updated successfully", 
//       blog 
//     });
//   } catch (error) {
//     console.log("Error updating blog:", error);
//     res.status(500).json({ 
//       success: false, 
//       message: "Error updating blog" 
//     });
//   }
// };

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ 
        success: false, 
        message: "Blog not found" 
      });
    }

    // Delete featured image
    const featuredImagePath = path.join(process.cwd(), blog.image.substring(1));
    if (fs.existsSync(featuredImagePath)) {
      fs.unlinkSync(featuredImagePath);
    }

    // Extract and delete images from content
    const imgRegex = /<img[^>]+src="\/uploads\/blogs\/([^"]+)"/g;
    let match;
    while ((match = imgRegex.exec(blog.content)) !== null) {
      const filename = match[1];
      const filepath = path.join("uploads/blogs", filename);
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({ 
      success: true, 
      message: "Blog deleted successfully" 
    });
  } catch (error) {
    console.log("Error deleting blog:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error deleting blog" 
    });
  }
};