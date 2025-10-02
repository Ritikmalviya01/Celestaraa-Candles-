import express from 'express';
import adminAuth from '../middleware/admin.middleware.js';
import { addProduct, addTestimonial, AdminLoginController, deleteProduct, deleteTestimonial, listProducts, listTestimonials } from '../controllers/Admin/admin.controller.js';
import bcrypt from "bcryptjs";

// import {
//   getDashboardStats,
//   addProduct,
//   listProducts,
//   updateProduct,
//   deleteProduct,
//   listUsers,
//   getOrders,
//   getCompletedOrders,
//   addTestimonial
// } from '../controllers/admin.controller.js';

const adminRouter = express.Router();
// Analytics / Home
// router.get('/dashboard', adminAuth, getDashboardStats);
adminRouter.post('/login' , AdminLoginController)
// // Products
adminRouter.post('/addProduct', adminAuth, addProduct);

adminRouter.get('/products', adminAuth, listProducts);
// router.put('/product/:id', adminAuth, updateProduct);
adminRouter.delete('/product/:productId', adminAuth, deleteProduct);

adminRouter.post("/add-testimonial", adminAuth, addTestimonial);
adminRouter.get("/list-testimonials", listTestimonials); // anyone can view
adminRouter.delete("/delete-testimonial/:testimonialId", adminAuth, deleteTestimonial);

// // Users
// router.get('/users', adminAuth, listUsers);

// // Orders
// router.get('/orders', adminAuth, getOrders);
// router.get('/orders/completed', adminAuth, getCompletedOrders);

// // Testimonials
// router.post('/testimonial', adminAuth, addTestimonial);

export default adminRouter;
