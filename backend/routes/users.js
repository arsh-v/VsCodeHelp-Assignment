const express = require("express");
const router = express.Router();
const validateSchema = require("../middleware/validator");
const isAuthenticated = require("../middleware/auth");
const { sendOtpSchema, verifyOtpSchema } = require("../validators/users");

// Import the user controller functions
const { sendOtp, verifyOtp } = require("../controllers/users");

// Route to send OTP to user's email
router.post("/send-otp", validateSchema(sendOtpSchema), sendOtp);

// Route to verify OTP
router.post("/verify-otp", validateSchema(verifyOtpSchema), verifyOtp);

// Route to logout
router.get("/logout", isAuthenticated, (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logged out successfully" });
});

// Route to get the current user
router.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({ user: req.session.email });
});

module.exports = router;
