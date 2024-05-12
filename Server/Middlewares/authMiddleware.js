const jwt = require("jsonwebtoken");

const User = require("../Model/User");
const ErrorHandler = require("../utils/ErrorHandler");
const { asyncHandler } = require("./asyncHandler");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = await User.findById(decoded.id).select("-password")
      next()
    } catch (error) {
      return next(new ErrorHandler("not authorized,invalid token", 401));
    }
  } else {
    return next(new ErrorHandler("Not authorized,no token", 401));
  }
});

module.exports = { protect };
