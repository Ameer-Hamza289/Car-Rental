const mongoose=require("mongoose")
const bcrypt = require('bcryptjs');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const PersonSchema=new mongoose.Schema({
    name:{
        type:String,
        required:false
    },
    phone:{
        type:String,
        required:true,
        unique: true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        lowercase: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password should be at least 8 character long"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      otp: {
        type: String,
      },
      otpExpiration: {
        type: Date,
      }
})


PersonSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    next();
  });

  
  const Person = mongoose.model("Person",PersonSchema)

module.exports=Person
