const Person=require('../model/person')
const jwt=require("jsonwebtoken")
const bcrypt=require("bcryptjs")
const express=require("express")
const router=express.Router()
const {sendOtpEmail}=require("../utils/sendOTP")
const { generateOTP } = require('../utils/generateOTP')
const upload=require("../utils/multer")
const { verifyAccessToken } = require('../utils/verifyToken');


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

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Person.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    //better to remove password field before sending user in response

    return res
      .status(200)
      .json({ token: accessToken, data: user, message: "Login Successful!" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/forget-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Person.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    const otp = generateOTP();
    await sendOtpEmail(email, otp);

    user.otp = otp;
    user.otpExpiration = Date.now() + 300000;

    await user.save();

    return res.status(200).json({ message: `OTP Sent Successfully!` });
  } catch (error) {
    console.error("Error requesting password reset:", error);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await Person.findOne({
      email,
      otp,
      otpExpiration: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password with OTP:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/update-profile",verifyAccessToken, async(req, res) => {
    const { userId, name, phone, postCode, address, gender } = req.body;
  console.log(req.file);
    // If a file is uploaded, handle the file upload
    if (req.file) {
      req.uploadType = "profilePicture";
      upload(req, res, async (err) => {
        if (err) {
          console.error("Error uploading profile picture:", err);
          return res.status(500).json({ message: "Internal Server Error" });
        }
  
        try {
          const updatedUser = await Person.findByIdAndUpdate(
            userId,
            {
              name,
              phone,
              postCode,
              address,
              gender,
              profilePicture: req.file.path,
            },
            { new: true }
          );
  
          return res
            .status(200)
            .json({ user: updatedUser, message: "Profile updated successfully" });
        } catch (updateError) {
          console.error("Error updating profile:", updateError);
          return res.status(500).json({ message: "Internal Server Error" });
        }
      });
    } else {
      // If no file is uploaded, update the user's profile without changing the profile picture

      try {
         const updatedUser=await Person.findByIdAndUpdate(
            userId,
            {
              name,
              phone,
              postCode,
              address,
              gender,
            },
            { new: true },
            // (err, updatedUser) => {
            //   if (err) {
            //     console.error("Error updating profile:", err);
            //     return res.status(500).json({ message: "Internal Server Error" });
            //   }
      
            //   return res
            //     .status(200)
            //     .json({ user: updatedUser, message: "Profile updated successfully" });
            // }
            )
            return res.status(200).json({user:updatedUser,message:"Profile's updated successfully "})
        
      } catch (error) {
        console.error("Error updating profile",error)
        return res.status(500).json({message:"Internal Server's Error"})
      }
    }
  });


module.exports=router
