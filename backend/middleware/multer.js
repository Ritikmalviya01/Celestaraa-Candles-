import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fieldSize: 25 * 1024 * 1024,   // 25MB for ReactQuill HTML content
    fileSize: 10 * 1024 * 1024,    // 10MB max file size for featured image
  },
});

export default upload;
