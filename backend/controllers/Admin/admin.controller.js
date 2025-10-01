import OrderModel from "../../models/order.model.js";
import ProductModel from "../../models/product.model.js";
import UserModel from "../../models/user.model.js";

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
      image,
      category,
      subCategory,
      unit,
      stock,
      price,
      discount,
      description,
      more_details,
      publish,
    } = req.body;

    // Basic validation
    if (!name || !price || !category || category.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Name, price, and at least one category are required",
      });
    }

    const product = new ProductModel({
      name,
      image: image || [],
      category,
      subCategory: subCategory || [],
      unit: unit || "",
      stock: stock || 0,
      price,
      discount: discount || 0,
      description: description || "",
      more_details: more_details || {},
      publish: publish !== undefined ? publish : true,
    });

    await product.save();

    res.status(201).json({
        error : false ,
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (err) {
    res.status(500).json({
        error : true ,
      success: false,
      message: err.message,
    });
  }
};


export const listProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()
      .populate("category", "name")
      .populate("subCategory", "name")
      .sort({ createdAt: -1 }); // newest first

    res.json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//edit api pending 

export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.body; // frontend sends productId in body

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required" });
    }

    const deletedProduct = await ProductModel.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({
        error: true,
         success: false, 
         message: "Product not found" });
    }

    res.json({
        error : false,
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ 
        error : true ,
        success: false, 
        message: err.message });
  }
};