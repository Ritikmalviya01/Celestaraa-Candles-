import sendEmail from "../config/sendEmail.js";
import UserModel from "../models/user.models.js";
import bcrypt from "bcryptjs";
import verifyEmailTeamplate from "../utils/verifyEmailTemplate.js";
import generatedAccessToken from "../utils/generatedAccessToken.js";
import generatedRefreshToken from "../utils/generatedRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generateOtp from "../utils/generateOtp.js";
import forgotPasswordTemplate from "../utils/forgotPasswordTemplate.js";
import jwt from "jsonwebtoken";



export async function registerUserController(req, res) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        error: true,
        success: false,
      })
    }
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.json({
        message: "Already account with this email",
        error: true,
        success: false,
      })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const payload = {
      name,
      email,
      password: hashedPassword,
    }

    const newUser = new UserModel(payload)
    const save = await newUser.save();

    const VerifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save?._id}`

    const verifyEmail = await sendEmail({
      sendTo: email,
      subject: "Welcome to Blinkeyit   Verify your email",
      html: verifyEmailTeamplate({
        name,
        url: VerifyEmailUrl

      })
    })
    return res.json({
      message: "User Register Successfully",
      error: false,
      success: true,
      data: save,
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    })
  }
}


export async function verifyEmailContrpoller(req , res) {
  try {
    const { code } = req.body;

    const user = await UserModel.findOne({ _id: code});
    if (!user) {
      return res.status(400).json({
        message: "Invalid verification code",
        error: true,
        succes: false
     
      })
    } 
    const updateUser = await UserModel.updateOne({_id : code}, {
      verify_email : true
    })
return res.json({
  message : "Email verify successfully",
  error : false,
  succes : true
})
  } catch (error) {
    return res.status(500).json({
      message : error.message ||error,
      error :true,
      succes :false
    })
  }
}

//login controller
export async function loginController(req, res) {
try {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
      error: true,
      success: false,
    })
  }

  const user = await UserModel.findOne({email});
  if (!user) {
    return res.status(400).json({
      message: "User not found",
      error: true,
      success: false,
  })
}
if(user.status !== "Active"){
  return res.status(403).json({
    message: `Your account is ${user.status}. Please contact support Team.`,
    error: true,
    success: false,

  })
}


const checkPassword = await bcrypt.compare(password , user.password)
if(!checkPassword){
  return res.status(400).json({
    message: "Invalid credentials",
    error: true,
    success: false,
  })
}

const accessToken = await generatedAccessToken(user._id)
const refreshToken = await generatedRefreshToken(user._id)


const cookieOption = {
  httpOnly :true ,
  secure : true,
  sameSite :"None"
}
res.cookie('accessToken' , accessToken, cookieOption)
res.cookie('refreshToken' , refreshToken, cookieOption)

return res.json({
  message: "Login successfull",
  error :false,
  success : true,
  data : {accessToken,refreshToken }

})

} catch (error) {
  return res.status(500).json({
    message: error.message || error,
    error: true,
    success: false,
  })
}
}

export async function logoutController(req, res) {
  try {
    const userId = req.userId
    const cookieOption = {
  httpOnly :true ,
  secure : true,
  sameSite :"None"
}
    res.clearCookie("accessToken", cookieOption)
    res.clearCookie("refreshToken", cookieOption)

    const removeRefreshToken = await UserModel.findByIdAndUpdate(userId, {
      refresh_token : ""
    })
    return res.json({
      message :"Logout Successfull",
      error: false,
      success :true 
    })
  } catch (error) {
    return res.status(500).json({
      message :error.message || error ,
      error :true ,
      success :false
    })
  }
}
//uploaduserAvtartar

export async function uploadAvatar(req , res) {
try {
  const userId = req.userId; // auth middleware
  const image = req.file ;  //multer middleware
  const upload = await uploadImageCloudinary(image);
const updateUser = await UserModel.findByIdAndUpdate(userId, {
  avatar :upload.url
})


 return res.json({
  message: "uploaded",
  data : {
    _id : userId,
    avatar : upload.url
  }
 })
  console.log("image", image)
} catch (error) {
  return res.status(500).json({
    message : error.message || error,
    error : true,
    success : false
  })
}
}

// update user details 

export async function updateUserDetails(req, res){
  try {
    const userId = req.userId
    const {name , email , mobile, password} = req.body
    let hashPassword = ""
if(password){
  const salt = await bcrypt.genSalt(10)
     hashPassword = await bcrypt.hash(password, salt)
}
    const updateUser = await UserModel.updateOne({_id : userId} , {
         ...(name &&{name : name}),
         ...(email &&{email : email}),
         ...(mobile &&{mobile : mobile}),
         ...(password && {password : hashPassword})
    })
return res.json({
  message : "Updated successfully",
  error : false,
  success : true ,
  data : updateUser
})
  } catch (error) {
    return res.status(500).json({
      message : error.message || error,
      error :true ,
      success : false ,
    })
  }
}

// forgot Password not login
export async function forgotPasswordController(req, res){
try {
  const { email} = req.body
  const user = await UserModel.findOne({email})

  if(!user) {
    return res.status(400).json({
      message: "Email Not Valid",
      error: true,
      success : false 
    }) 
  }

  const otp = generateOtp()
  const expireTime = new Date() + 60 * 60 * 1000;

  const update = await UserModel.findByIdAndUpdate(user._id,{
    forgot_password_otp : otp,
    forgot_password_expiry : new Date(expireTime).toISOString()
  })

  await sendEmail({
    sendTo: email,
    subject: "Forgot Passwod Verification ",
    html : forgotPasswordTemplate({
      name : user.name,
      otp :otp
    })

  })
  return res.json({
    message : "Check your Mail For OTP",
    error : false ,
    success : true
  })
} catch (error) {
  return res.status.json(500)({
    message: error.message || error,
    error: true ,
    success : false
      })
}
}

// verify otp  for forgot password 
export async function verifyForgotPasswordOtp(req, res) {
  try {
    const { email, otp } = req.body
 if(!email || !otp){
  return res.status(400).json({
    message : "All fields are required",
    error : true , 
    succes : false ,

  })
 }
const user = await UserModel.findOne({ email })
    if (!user) {
      res.status(400).json({
        message: "Eamail not found",
        error: true,
        success: false,
      })
    }

const currentTime  = new  Date().toISOString()
if (user.forgot_password_expiry < currentTime){
return res.status(400).json({
  message : "OTP Expired",
  error : true ,
  success : false ,
})
}

if(otp !== user.forgot_password_otp ) {
  return res.ststus(400).json({
  message : "Invalid Otp",
  error :true ,
  success : false 
  }
 )}

 return res.json({
  message: "OTP verifies succesfully",
  error : false ,
  succes : false 
 })


  } catch (error) {
    return res.status(500).json({
      message: error.message ||error,
      error: true,
      success: false, 
    })
  }
}

// reset the pass
export async function resetPassword(req, res){
  try {
    const {email , newPassword, confirmPassword} = req.body;
    console.log("email",email)
    if(!email || !newPassword || !confirmPassword){
      return res.status(400).json({
        message : "All Fields are Required" ,
        error : true ,
        success : false ,
      })
    }
    const user = await UserModel.findOne({email});
    if(!user){
      return res.status(400).json({
        message: "Email not Found",
        error : true, 
        success : false, 
      })
    }
    if(newPassword !== confirmPassword){
      return res.status(400).json({
        message : "Password not match",
        error : true,
        success : false ,
      })
    }

  const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

  const updatedPassword = await UserModel.findOneAndUpdate(user._id,{
    password : hashedPassword
  })
return res.json({
  message : "Password Upadated Successfully",
  error : false ,
  success : true , 
})

  } catch (error) {
     return res.status(500).json({
      message: error.message ||error,
      error: true,
      success: false, 
    })
  }
}

//refresh token controller 

export async function refreshToken(req, res) {
  try {
    // 1. Get refresh token from cookie or header
    const refreshToken =
      req.cookies.refreshToken ||
      req.headers?.authorization?.split(" ")[1]; // Bearer <token>

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token missing",
        error: true,
        success: false
      });
    }

    // 2. Verify refresh token
    const verifyToken = jwt.verify(
      refreshToken,
      process.env.SECRET_KEY_REFRESH_TOKEN
    );

    // 3. Extract userId from payload
    const userId = verifyToken._id; // or verifyToken.id if you used "id"

    // 4. Generate new access token
    const newAccessToken = await generatedAccessToken(userId);

    // 5. Set cookie
    const cookiesOption = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None"
    };

    res.cookie("accessToken", newAccessToken, cookiesOption);

    // 6. Send response
    return res.json({
      message: "New access token generated",
      error: false,
      success: true,
      data: { accessToken: newAccessToken }
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Invalid or expired refresh token",
      error: true,
      success: false
    });
  }
}
