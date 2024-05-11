const express=require("express")
const {authUser, registerUser} = require("../Controllers/userControllers")

const router=express.Router()

router.route("/auth").post(authUser)
router.route("/register").post(registerUser)

module.exports=router