const nodemailer=require("nodemailer")


 const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "", // Your Gmail email address
      pass: "", // Your Gmail password 
    },
  });

  const mailOptions = {
    from: "", // Your Gmail email address
    to: email,
    subject: "Verification Code By Car Rental System",
    text: `Your OTP is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports={sendOtpEmail}