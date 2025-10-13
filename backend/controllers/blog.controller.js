import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import Blog from "../models/Blog.model.js";

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
export const uploadBlogImage = upload.single("image");

// Helper function to extract and save base64 images from ReactQuill content
const processQuillImages = async (content) => {
  // Regular expression to find base64 images in img tags
  const base64Regex = /<img[^>]+src="data:image\/([^;]+);base64,([^"]+)"/g;
  let match;
  let processedContent = content;
  
  while ((match = base64Regex.exec(content)) !== null) {
    const fullMatch = match[0];
    const imageType = match[1]; // jpeg, png, etc.
    const base64Data = match[2];
    
    try {
      // Generate unique filename
      const filename = `${uuidv4()}.${imageType}`;
      const filepath = path.join("uploads/blogs", filename);
      
      // Convert base64 to buffer and save
      const buffer = Buffer.from(base64Data, 'base64');
      
      // Create directory if it doesn't exist
      if (!fs.existsSync("uploads/blogs")) {
        fs.mkdirSync("uploads/blogs", { recursive: true });
      }
      
      fs.writeFileSync(filepath, buffer);
      
      // Replace base64 src with file URL
      const imageUrl = `/uploads/blogs/${filename}`;
      processedContent = processedContent.replace(
        fullMatch,
        `<img src="${imageUrl}"`
      );
    } catch (error) {
      console.error("Error processing image:", error);
    }
  }
  
  return processedContent;
};

// Create Blog Controller
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ 
        success: false,
        message: "Title and content are required" 
      });
    }

    // Check if featured image was uploaded
    if (!req.file) {
      return res.status(400).json({ 
        success: false,
        message: "Featured blog image is required" 
      });
    }

    // Create featured image URL path
    const featuredImagePath = `/uploads/blogs/${req.file.filename}`;

    // Process content to extract and save any base64 images from ReactQuill
    const processedContent = await processQuillImages(content);

    // Create new blog
    const blog = new Blog({ 
      title, 
      content: processedContent, // Save processed content with image URLs
      image: featuredImagePath 
    });

    await blog.save();

    return res.status(201).json({ 
      success: true,
      message: "Blog created successfully", 
      blog 
    });

  } catch (error) {
    console.log("Error creating blog:", error);
    return res.status(500).json({ 
      success: false,
      message: error.message || "Error creating blog" 
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
    const blog = await Blog.findById(req.params.id);
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