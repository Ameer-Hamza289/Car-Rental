const Person=require('../model/person')
const jwt=require("jsonwebtoken")
const express=require("express")
const router=express.Router()
const {sendOtpEmail}=require("../utils/sendOTP")


router.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const existingUser = await Person.findOne({ $or: [{ phone }, { email }] });
    if (existingUser) {
      if (existingUser.phone === phone) {
        return res
          .status(400)
          .json({ message: "Phone number already registered" });
      } else if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already registered" });
      }
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    const newUser = new Person({
      name,
      phone,
      email,
      password,
      otp,
      otpExpiration,
    });
    await newUser.save();

    //send OTP 
    await sendOtpEmail(email, otp);

    return res
      .status(201)
      .json({ message: `Verify OTP sent to ${email} to activate.` });
  } catch (error) {
    // if (error.code && error.code === 11000) {
    //     // Duplicate key error
    //     if (error.keyPattern && error.keyPattern.email) {
    //       return res.status(400).json({ message: 'Email already registered' });
    //     } else if (error.keyPattern && error.keyPattern.phone) {
    //       return res.status(400).json({ message: 'Phone number already registered' });
    //     }
    //   }
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await Person.findOne({
      email,
      otp,
      otpExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();

    return res.status(200).json({ message: "Account activated!" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});



module.exports=router
