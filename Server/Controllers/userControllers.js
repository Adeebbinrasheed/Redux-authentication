const { asyncHandler } = require("../Middlewares/asyncHandler")
const ErrorHandler = require("../utils/ErrorHandler")
const User=require("../Model/User")
const generateToken = require("../utils/generateToken")


const authUser=asyncHandler(async(req,res,next)=>{
    res.status(200).json({message:'auth user'})
})

//register user
const registerUser=asyncHandler(async(req,res,next)=>{
    const {name,email,password}=req.body

    const userExists= await User.findOne({email})
    if(userExists){
        return next(new ErrorHandler("user already exists",400))
    }

    const user= await User.create({
        name,
        email,
        password
    })

    if(user){
        generateToken(user,res)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email
        })
    }else{
        return next(new ErrorHandler("Invalid user data",400))
    }


    res.status(200).json({message:"register user"})
})

module.exports={authUser,registerUser}