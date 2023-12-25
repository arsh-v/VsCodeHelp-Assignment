const { User } = require("../models");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Function to send OTP
const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // OTP expires in 15 minutes

    // Create a transporter for nodemailer
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Send email with the OTP
    await transporter.sendMail({
      from: process.env.GMAIL_EMAIL,
      to: email,
      subject: "Your OTP",
      text: `Your OTP is ${otp}`,
    });
    transporter.close();

    // Save or update the user's OTP and its expiration time
    let user = await User.findOneAndUpdate(
      { email },
      { otp, otpExpires },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: "OTP sent successfully", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
};

// Function to verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Update user's verified status
    user.verified = true;
    user.otp = null; // Clear the OTP
    user.otpExpires = null; // Clear the OTP expiration
    
    await user.save();

    req.session.userId = user._id;
    req.session.email = user.email;

    res.status(200).json({ message: "User verified successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
};
