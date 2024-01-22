const mongoose=require("mongoose");


const RentalSchema=new mongoose.Schema({
    billingInfo:{
        name:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        }
    },
    rentalInfo:{
        pickUp:{
            locations:{
                type:String,
                required:true
            },
            date:{
                type:Date,
                required:true,
                default:Date.now
            },
            time:{
                type:Date,
                required:true,
                default:Date.now
            }
        },
        dropOff:{
            locations:{
                type:String,
                required:true
            },
            date:{
                type:Date,
                required:true,
                default:Date.now
            },
            time:{
                type:Date,
                required:true,
                default:Date.now
            }
        }
    },
    paymentMethod:{
        type: {
            type: String,
            enum: ["cash", "debitCard"],
            required: true,
          },
          cardNumber: {
            type: String,
            required: function () {
              return this.paymentMethod.type === "debitCard";
            },
          },
          cardHolder: {
            type: String,
            required: function () {
              return this.paymentMethod.type === "debitCard";
            },
          },
          cvv: {
            type: String,
            required: function () {
              return this.paymentMethod.type === "debitCard";
            },
          },
          expiry: {
            type: String,
            required: function () {
              return this.paymentMethod.type === "debitCard";
            },
        }
    }

})