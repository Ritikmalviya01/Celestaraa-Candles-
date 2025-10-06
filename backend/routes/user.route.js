import {Router} from 'express'

import { addToCart, forgotPasswordController, getAllProductsForUser, getProductById, loginController, logoutController, registerUserController, updateUserDetails } from '../controllers/user.controller.js'
import { auth } from '../middleware/auth.js'
// import { forgotPasswordController, loginController, logoutController, registerUserController, updateUserDetails, uploadAvatar, verifyEmailContrpoller } from '../controllers/user.controller.js'
// import auth from '../middleware/auth.js'
// import upload from '../middleware/multer.js'
const userRouter = Router()

userRouter.post('/register' , registerUserController)
// userRouter.post('/verify-email', verifyEmailContrpoller)
userRouter.post('/login', loginController)
userRouter.get('/logout',auth(["USER"]) , logoutController)
// userRouter.put('/upload-avatar', auth, upload.single('avatar'), uploadAvatar)
userRouter.put('/update-user', auth(["USER"]) , updateUserDetails)
userRouter.put('/forgot-password', forgotPasswordController)
userRouter.get('/products' , getAllProductsForUser);
userRouter.get('/singleProduct/:_id', getProductById)
userRouter.post('/add-to-cart' ,auth(["USER"])  , addToCart )


export default userRouter