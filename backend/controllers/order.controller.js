import UserModel from "../models/user.models.js";
import OrderModel from "../models/order.model.js";
// import Razorpay from "razorpay";
// import crypto from "crypto";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// export const createOrder = async (req, res) => {
//   try {
//     const { userId, items, delivery_address, subTotalAmnt } = req.body;

//     if (!items || items.length === 0) {
//       return res.status(400).json({ success: false, message: "Cart is empty" });
//     }

//     const options = {
//       amount: subTotalAmnt * 100, // in paise
//       currency: "INR",
//       receipt: `order_rcptid_${Date.now()}`,
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     // Create order in DB
//     const newOrder = await OrderModel.create({
//       userId,
//       orderId: razorpayOrder.id,
//       items,
//       delivery_address,
//       subTotalAmnt,
//       totalAmt: subTotalAmnt,
//       payment_status: "pending",
//     });

//     // ✅ Add order to user's orderHistory
//     await UserModel.findByIdAndUpdate(
//       userId,
//       { $push: { orderHistory: newOrder._id } },
//       { new: true }
//     );

//     res.status(201).json({
//       success: true,
//       order: newOrder,
//       razorpayOrder,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };





// Test order creation (no payment)
export const createOrder = async (req, res) => {
  try {
    const userId = req.userId; 
    const {items, delivery_address, subTotalAmnt } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    // Create order in DB
    const newOrder = await OrderModel.create({
      userId,
      orderId: `TEST_ORDER_${Date.now()}`, // generate test order id
      items,
      delivery_address,
      subTotalAmnt,
      totalAmt: subTotalAmnt,
      payment_status: "pending", // just for testing
    });

    // Add order to user's orderHistory
    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { orderHistory: newOrder._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Test order created successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const  userId  = req.userId;
 if (!userId) {
      return res.status(400).json({ success: false, message: "User not authenticated" });
    }
    const user = await UserModel.findById(userId)
      .populate({
        path: "orderHistory",
        populate: { path: "items.productId", model: "product" } // populate products inside orders
      });

    res.status(200).json({ success: true, orders: user.orderHistory });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
