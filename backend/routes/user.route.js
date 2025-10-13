import {Router} from 'express'
import { createOrder, getUserOrders } from '../controllers/order.controller.js'
import { addToCart, addUserAddress, forgotPasswordController, getAllProductsForUser, getCart, getProductById, loginController, logoutController, registerUserController, removeCart, updateCart, updateUserDetails } from '../controllers/user.controller.js'
import { auth } from '../middleware/auth.js'
// import { forgotPasswordController, loginController, logoutController, registerUserController, updateUserDetails, uploadAvatar, verifyEmailContrpoller } from '../controllers/user.controller.js'
// import auth from '../middleware/auth.js'
// import upload from '../middleware/multer.js'
const userRouter = Router()

userRouter.post('/register' , registerUserController)
// userRouter.post('/verify-email', verifyEmailContrpoller)
userRouter.post('/login', loginController)
userRouter.post('/logout', logoutController)
// userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar)
userRouter.put('/update-user', auth(["USER"]) , updateUserDetails)
userRouter.put('/forgot-password', forgotPasswordController)
userRouter.get('/products' , getAllProductsForUser);
userRouter.get('/singleProduct/:_id', getProductById)
userRouter.post('/add-to-cart' ,auth(["USER"])  , addToCart )
userRouter.get("/get-cart", auth(["USER"]), getCart);
userRouter.put("/update-cart", auth(["USER"])  , updateCart)
userRouter.delete("/remove-cart", auth(["USER"])  , removeCart)

userRouter.post("/add-address" ,auth(["USER"]) , addUserAddress )
userRouter.post("/create-order" , auth(["USER"]), createOrder )
userRouter.get("/get-orders" , auth(["USER"]) , getUserOrders)
export default userRouter