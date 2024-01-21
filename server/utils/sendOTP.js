const nodemailer=require("nodemailer")


 const sendOtpEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    // service: "gmail",
    // host: 'smtp.gmail.com',
    host: 'smtp-mail.outlook.com',
    secureConnection:false,
    port:587,
    auth: {
      user: "ameer.hamza102002@gmail.com", // Your mail address
      pass: "", // Your mail password 
    },
    tls: {
        ciphers:'SSLv3'
    }
  });

  const mailOptions = {
    from: "ameer.hamza102002@gmail.com", // Your mail email address
    to: email,
    subject: "One time use OTP By Car Rental System",
    text: `Your OTP is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
//   ,(err,info)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Email Sent :"+ info.response);
//     }
//   }
};

module.exports={sendOtpEmail}