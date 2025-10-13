import OrderModel from "../../models/order.model.js";
import ProductModel from "../../models/product.model.js";
import UserModel from "../../models/user.models.js";
import CategoryModel from "../../models/category.model.js";
import SubCategoryModel from "../../models/subCategory.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import generatedAccessToken from "../../utils/generatedAccessToken.js";
import generatedRefreshToken from "../../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../../utils/uploadImageCloudinary.js";
import TestimonialModel from "../../models/testimonial.model.js";

export async function AdminLoginController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        error: true,
        success: false,
      });
    }
    if (user.status !== "Active") {
      return res.status(403).json({
        message: `Your account is ${user.status}. Please contact support Team.`,
        error: true,
        success: false,
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid credentials",
        error: true,
        success: false,
      });
    }

    const accessToken = await generatedAccessToken(user._id);
    const refreshToken = await generatedRefreshToken(user._id);

    const cookieOption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    res.cookie("accessToken", accessToken, cookieOption);
    res.cookie("refreshToken", refreshToken, cookieOption);

    return res.json({
      message: "Login successfull",
      error: false,
      success: true,
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments();
    const totalProducts = await ProductModel.countDocuments();
    const totalOrders = await OrderModel.countDocuments();
    const completedOrders = await OrderModel.countDocuments({
      payment_status: "Completed", // since you don’t have "status"
    });

    // Fetch recent 5 orders with user + address populated
    const recentOrders = await OrderModel.find()
      .sort({ createdAt: -1 }) // newest first
      .limit(5)
      .populate("userId", "name email") // only fetch name, email of user
      .populate("delivery_address"); // fetch address details

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        completedOrders,
        recentOrders,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate({
  path: "userId",
  select: "name email phone address_details",
  populate: { path: "address_details" }
}) 
      .populate("items.productId", "name price image") 
      .sort({ createdAt: -1 }); 

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



export const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.body; // frontend will send orderId in body

    if (!orderId) {
      return res.status(400).json({
        error: true,
        success: false,
        message: "Order ID is required",
      });
    }

    const order = await OrderModel.findOne({ orderId })
      .populate("userId", "name email phone") // fetch limited user fields
      .populate("delivery_address"); // fetch full address

    if (!order) {
      return res.status(404).json({
        error : true ,
        success: false,
        message: "Order not found",
      });
    }

    res.json({
        error: false,
      success: true,
      data: order,
    });
  } catch (err) {
    res.status(500).json({
       
    error : true,
      success: false,
      message: err.message,
    });
  }
};









export const addProduct = async (req, res) => {
  try {
    const {
      name,
      
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
      publish,
    } = req.body;

    if (!name || !price ) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and at least one category are required",
      });
    }

    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    // ✅ Upload images
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const uploaded = await uploadImageCloudinary(file);
        imageUrls.push(uploaded.secure_url);
      }
    }

    // ✅ Parse more_details safely
    const moreDetailsObj = typeof more_details === "string" ? JSON.parse(more_details) : more_details || {};
    const structuredDetails = {
      aromaLevel: moreDetailsObj.aromaLevel || null,
      aromaType: moreDetailsObj.aromaType || null,
      productSize: moreDetailsObj.productSize || null,
      burnTime: moreDetailsObj.burnTime || null,
      waxType: moreDetailsObj.waxType || null,
      wickType: moreDetailsObj.wickType || null,
      priceRange: moreDetailsObj.priceRange || null,
      color: moreDetailsObj.color || null,
      ecoFriendly: moreDetailsObj.ecoFriendly || [],
      rating: moreDetailsObj.rating || null,
      occasion: moreDetailsObj.occasion || null,
    };

    const product = new ProductModel({
      name,
      image: imageUrls,
      
     
      unit: unit || "",
      stock: stock || 0,
      price,
      discount: discount || 0,
      description: description || "",
      more_details: structuredDetails,
      publish: publish !== undefined ? publish : true,
    });

    await product.save();

    res.status(201).json({
      error: false,
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    console.error(err); // <-- log the exact error
    res.status(500).json({
      error: true,
      success: false,
      message: err.message,
    });
  }
};



// controllers/productController.js
// controllers/productController.js

export const listProducts = async (req, res) => {
  try {
    // Get all published products (you can remove the filter if you want all)
    const products = await ProductModel.find({ publish: true })
      .sort({ createdAt: -1 }); // newest first

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found.",
      });
    }

    // Send full raw product details
    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};



//edit api pending 


export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body; // 👈 now taking from body

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        error: true,
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      error: false,
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      success: false,
      message: err.message,
    });
  }
};


// ✅ Add Testimonial
export const addTestimonial = async (req, res) => {
  try {
    const { name, description, image } = req.body;

    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "Name and description are required",
      });
    }

    const testimonial = new TestimonialModel({
      name,
      description,
      // rating: rating || 5,
      image: image || "",
    });

    await testimonial.save();

    res.status(201).json({
      success: true,
      message: "Testimonial added successfully",
      data: testimonial,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ List Testimonials
export const listTestimonials = async (req, res) => {
  try {
    const testimonials = await TestimonialModel.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: testimonials,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ✅ Delete Testimonial
export const deleteTestimonial = async (req, res) => {
  try {
    const { testimonialId } = req.params;

    if (!testimonialId) {
      return res.status(400).json({
        success: false,
        message: "Testimonial ID is required",
      });
    }

    const deleted = await TestimonialModel.findByIdAndDelete(testimonialId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Testimonial not found",
      });
    }

    res.json({
      success: true,
      message: "Testimonial deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
