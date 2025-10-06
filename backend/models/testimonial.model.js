import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // customer name
  },
  description: {
    type: String,
    required: true, // feedback/testimonial
  },
  // rating: {
  //   type: Number,
  //   min: 1,
  //   max: 5,
  //   default: 5, // star rating out of 5
  // },
  image: {
    type: String,
    default: "", // optional customer photo/avatar
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const TestimonialModel = mongoose.model("testimonial", testimonialSchema);

export default TestimonialModel;
