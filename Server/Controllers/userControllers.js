const { asyncHandler } = require("../Middlewares/asyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const User = require("../Model/User");
const generateToken = require("../utils/generateToken");

//login
const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("please provide all fields", 400));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(new ErrorHandler("Requested User not Found", 400));
  }

  // console.log(user);
  const isPasswordValid = await user.comparePassword(password);
  // console.log(isPasswordValid);
  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid credentials", 400));
  }
  generateToken(user, res);

  res.status(200).json({ success: true, message: "auth user" });
});

//register user
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorHandler("user already exists", 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(user, res);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    return next(new ErrorHandler("Invalid user data", 400));
  }

  res.status(200).json({ success: true, message: "register user" });
});

//logout
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt",'', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(201).json({ success: true, message: "user logged succesfully" });
});

//profile
const profileUser=asyncHandler(async(req,res,next)=>{
  const user={
    _id:req.user._id,
    name:req.user.name,
    email:req.user.email
  }
  res.status(201).json({success:true,user})
})

//updatedprofile
const updateUserProfile=asyncHandler(async(req,res,next)=>{
  res.status(201).json({success:true,message:"updated profile"})
})
module.exports = { authUser, registerUser, logoutUser,profileUser,updateUserProfile };
