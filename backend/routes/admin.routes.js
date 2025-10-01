import express from 'express';
import adminAuth from '../middleware/admin.middleware';
import { addProduct } from '../controllers/Admin/admin.controller';

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

// // Products
adminRouter.post('/addProduct', adminAuth, addProduct);
// router.get('/products', adminAuth, listProducts);
// router.put('/product/:id', adminAuth, updateProduct);
// router.delete('/product/:id', adminAuth, deleteProduct);

// // Users
// router.get('/users', adminAuth, listUsers);

// // Orders
// router.get('/orders', adminAuth, getOrders);
// router.get('/orders/completed', adminAuth, getCompletedOrders);

// // Testimonials
// router.post('/testimonial', adminAuth, addTestimonial);

export default adminRouter;
