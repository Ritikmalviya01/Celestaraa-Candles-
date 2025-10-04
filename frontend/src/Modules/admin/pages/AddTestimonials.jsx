import React, { useState } from "react";
import toastify from "react-hot-toast"

const TestimonialForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    city: "",
    description: "",
    photo: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const file = files[0];
      setFormData({ ...formData, [name]: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Testimonial Data:", formData);
    toastify.success("Testimonial added Successfully");

    // reset form
    setFormData({
      name: "",
      photo: null,
      role: "",
      city: "",
      description: "",
    });

    setPreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f7f3f0] px-4">
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-8 max-w-lg w-full border border-[#e6ddd5]">
        <h2 className="text-2xl font-bold text-[#4b3f34] mb-6 text-center">
          Add Testimonial
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-[#6a5c4c] mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-[#e2d7cf] focus:ring-2 focus:ring-[#b08968] focus:outline-none"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-[#6a5c4c] mb-1">
              Role
            </label>
            <input
              type="text"
              name="role"
              placeholder="Customer / Designer / etc."
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-[#e2d7cf] focus:ring-2 focus:ring-[#b08968] focus:outline-none"
            />
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-[#6a5c4c] mb-1">
              City
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-[#e2d7cf] focus:ring-2 focus:ring-[#b08968] focus:outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-[#6a5c4c] mb-1">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              placeholder="Write their testimonial here..."
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-[#e2d7cf] focus:ring-2 focus:ring-[#b08968] focus:outline-none resize-none"
              required
            ></textarea>
          </div>

          {/* Photo Upload */}
          <div>
            <label className="block text-sm font-medium text-[#6a5c4c] mb-2">
              Photo
            </label>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-[#4b3f34] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#b08968] file:text-white hover:file:bg-[#8c6c54] cursor-pointer"
            />

            {/* Preview Image */}
            {preview && (
              <div className="mt-4 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded-full shadow-md border border-[#e6ddd5]"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#b08968] text-white py-3 rounded-xl font-semibold tracking-wide hover:bg-[#8c6c54] transition-all duration-200 shadow-md"
          >
            Submit Testimonial
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestimonialForm;
