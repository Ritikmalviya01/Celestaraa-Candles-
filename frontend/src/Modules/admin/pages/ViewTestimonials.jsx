import React, { useState } from "react";

// Dummy data for now (replace with API/Context data later)
const dummyTestimonials = [
  {
    id: 1,
    name: "Aditi Sharma",
    role: "Customer",
    city: "Mumbai",
    description: "The candles are beautiful and smell divine! Perfect for gifting 💖",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Rohan Verma",
    role: "Designer",
    city: "Delhi",
    description: "Loved the customizable design options. My clients were amazed!",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
   {
    id: 3,
    name: "Aditi Sharma",
    role: "Customer",
    city: "Mumbai",
    description: "The candles are beautiful and smell divine! Perfect for gifting 💖",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 4,
    name: "Rohan Verma",
    role: "Designer",
    city: "Delhi",
    description: "Loved the customizable design options. My clients were amazed!",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
];

const ViewTestimonials = () => {
  const [testimonials, setTestimonials] = useState(dummyTestimonials);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#f7f3f0] py-12 px-6">
      <h2 className="text-3xl font-bold text-center text-[#4b3f34] mb-10">
        Customer Testimonials 💬
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl shadow-lg p-6 border border-[#e6ddd5] hover:shadow-xl transition-all"
          >
            {/* Photo */}
            <div className="flex justify-center">
              <img
                src={t.photo}
                alt={t.name}
                className="w-20 h-20 object-cover rounded-full shadow-md border border-[#e6ddd5]"
              />
            </div>

            {/* Content */}
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-[#4b3f34]">{t.name}</h3>
              <p className="text-sm text-[#6a5c4c]">
                {t.role} • {t.city}
              </p>
              <p className="text-gray-600 text-sm mt-3 italic">“{t.description}”</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewTestimonials;
