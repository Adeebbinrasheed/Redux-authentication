const mongoose = require("mongoose");
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please Enter your Password"],
      minLength: [4, "Password Should be greater than 4 Characters"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next()
  }
  this.password=await bcrypt.hash(this.password,10)
})

userSchema.methods.getJwtToken=function (){
  return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
    expiresIn:process.env.JWT_EXPIRES
  })
}

userSchema.methods.comparePassword=async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

module.exports=new mongoose.model('User',userSchema)
