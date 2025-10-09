import express from 'express';
import {auth} from '../middleware/auth.js';
import { addProduct, addTestimonial, AdminLoginController, deleteProduct, deleteTestimonial, getOrders, listProducts, listTestimonials } from '../controllers/Admin/admin.controller.js';
import bcrypt from "bcryptjs";
import upload from '../middleware/multer.js';

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
// adminRouter.post('/login' , AdminLoginController)
// // Products
adminRouter.post('/addProduct', auth(["ADMIN"]), upload.array("images") , addProduct);

adminRouter.get('/products', auth(["ADMIN"]), listProducts);
// router.put('/product/:id', adminAuth, updateProduct);
adminRouter.delete('/product/:productId', auth(["ADMIN"]), deleteProduct);
adminRouter.get('/listed-products' , auth(["ADMIN"]), listProducts)
adminRouter.delete('/delete-product' , auth(["ADMIN"]), deleteProduct)
adminRouter.get('/get-orders' , auth(["ADMIN"]), getOrders)
adminRouter.post("/add-testimonial", auth(["ADMIN"]),upload.single("photo"), addTestimonial);
adminRouter.get("/list-testimonials", listTestimonials); // anyone can view
adminRouter.delete("/delete-testimonial/:testimonialId", auth(["ADMIN"]), deleteTestimonial);
// // Users
// router.get('/users', adminAuth, listUsers);

// // Orders
// router.get('/orders', adminAuth, getOrders);
// router.get('/orders/completed', adminAuth, getCompletedOrders);

// // Testimonials
// router.post('/testimonial', adminAuth, addTestimonial);

export default adminRouter;
