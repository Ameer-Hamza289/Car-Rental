const mongoose=require("mongoose");


const SummarySchema=new mongoose.Schema({
    car:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Car"
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Person"
    }
})

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
            location:{
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
    },
    status: {
        type: String,
        enum: ["pending", "ongoing", "completed"],
        default: "pending",
      },
      totalAmount: {
        type: Number,
        required: true,
      },
    summary:SummarySchema

})

const Rental=mongoose.model("Rental",RentalSchema)

module.exports=Rental