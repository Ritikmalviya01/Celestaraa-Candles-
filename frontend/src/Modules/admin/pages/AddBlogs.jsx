import React, { useState } from "react";

import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

 const AddBlogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      alert("Please fill all fields before submitting!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);

    // 👇 Example API call
    // axios.post(`${BASE_URL}/api/blogs`, formData, {
    //   headers: { "Content-Type": "multipart/form-data" },
    // });

    console.log("Blog submitted:", { title, content, image });
    alert("Blog Created Successfully (dummy)");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-center mb-8">Manage Blogs</h1>

      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 border border-gray-100">
        <h2 className="text-lg font-semibold mb-4">Create New Blog</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Text Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Content
            </label>
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              className="bg-white rounded-lg"
              placeholder="Write your blog content here..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Blog Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full border border-gray-300 rounded-lg p-2 text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary transition-all font-medium"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogs;
