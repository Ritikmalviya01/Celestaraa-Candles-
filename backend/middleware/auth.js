// import jwt from 'jsonwebtoken'

// export const auth = async(req , res , next ) => {
//     try {
//         const token = req.cookies.accessToken || req?.header?.authorization?.split(" ")[1] 
//         console.log("token :", token)
//         if(!token){
//             return res.status(401).json({
//                 message : "Provide Token"
//             })
//         }

//         const decode = await jwt.verify(token , process.env.SECRET_KEY_ACCESS_TOKEN )


//         console.log("decode" ,decode)
//         if(!decode){
//             return res.status(401).json({
//                 message : "unauthorized access",
//                 error :true,
//                 success :false
//             })
//         }
//         req.userId = decode.id
//         next()
//     } catch (error) {
//         return res.status(500).json({
//       message :error.message || error ,
//       error :true ,
//       success :false
//     })
//     }
    
// }
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.models.js';

export const auth = (allowedRoles = []) => async (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Provide Token" });
    }

    console.log("Cookies:", req.cookies);

    const decode = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    const userId = decode._id || decode.id; // <- FIX HERE
    if (!userId) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "User not found", error: true, success: false });
    }

    if (allowedRoles.length && !allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: "Forbidden: You don't have access", error: true, success: false });
    }

    req.userId = user._id;
    req.userRole = user.role;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message || error, error: true, success: false });
  }
};

