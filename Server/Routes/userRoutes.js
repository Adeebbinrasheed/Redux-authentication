const express = require("express");
const {
  authUser,
  registerUser,
  logoutUser,
  profileUser,
  updateUserProfile,
} = require("../Controllers/userControllers");
const { protect } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.route("/login").post(authUser);
router.route("/register").post(registerUser);
router.route("/logout").post(logoutUser);
router
  .route("/profile")
  .get(protect, profileUser)
  .put(protect, updateUserProfile);
module.exports = router;
