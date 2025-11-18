import mongoose from "mongoose";
import slugify from "slugify";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
    maxLength: [200, "Title cannot exceed 200 characters"]
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  content: {
    type: String,
    required: [true, "Content is required"]
    // This will contain HTML with <h1>, <h2>, <p>, <img> tags from ReactQuill
  },
  image: {
    type: String,
    required: [true, "Featured image is required"]
    // This is the main/cover image URL
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});



blogSchema.pre("save", function (next) {
  if (!this.isModified("title")) return next();
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

export default mongoose.model("Blog", blogSchema);