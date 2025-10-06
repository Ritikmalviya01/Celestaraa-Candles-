import mongoose from "mongoose";

const moreDetailsSchema = new mongoose.Schema(
  {
    aromaLevel: {
      type: String,
      enum: ["Soft", "Medium", "Strong"],
    },
    aromaType: {
      type: String,
      enum: ["Fruits", "Floral", "Nature", "Woody", "Spices", "Parfum"],
    },
    productSize: {
      type: String,
      enum: ["Small", "Medium", "Large"],
    },
    burnTime: {
      type: String,
      enum: ["< 20 hrs", "20–40 hrs", "40+ hrs"],
    },
    waxType: {
      type: String,
      enum: ["Soy", "Beeswax", "Paraffin", "Coconut", "Blend"],
    },
    wickType: {
      type: String,
      enum: ["Single Wick", "Multi Wick", "Wooden Wick"],
    },
    priceRange: {
      type: String, // or Number if you want range dynamically
    },
    color: {
      type: String,
      enum: ["White", "Black", "Red", "Pink", "Green", "Orange" , "Brown"],
    },
    ecoFriendly: [
      {
        type: String,
        enum: ["Vegan", "Cruelty-Free", "Handmade"],
      },
    ],
    rating: {
      type: String,
      enum: ["4★ & up", "3★ & up"],
    },
    occasion: {
      type: String,
      enum: ["Gift Sets", "Holiday", "Romantic", "Relaxation", "Luxury"],
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    image: {
      type: Array,
      default: [],
    },
    category: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "category",
      },
    ],
    subCategory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "subCategory",
      },
    ],
    unit: {
      type: String,
      default: "",
    },
    stock: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: null,
    },
    description: {
      type: String,
      default: "",
    },
    more_details: {
      type: moreDetailsSchema,
      default: {},
    },
    publish: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model("product", productSchema);
export default ProductModel;