const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: 1,
    max: 5,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Person",
    required: true,
  },
  reviewMessage: {
    type: String,
    required: [true, "Review message is required"],
  },
  reviewDate: {
    type: Date,
    default: Date.now,
  },
});

const CarSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Car name is required"],
    unique: true,
  },
  rating: {
    type: String,
  },
  carType: {
    type: String,
    required: [true, "Car Type is required"],
  },
  capacity: {
    type: Number,
    required: [true, "Car Capacity is required"],
  },
  steering: {
    type: String,
    required: [true, "Car Steering either automatic or manual"],
  },
  gasoline: {
    type: Boolean,
    default: null,
  },
  petrol: {
    type: Boolean,
    default: null,
  },
  ratePerDay: {
    type: String,
    required: [true, "Rate per day is required "],
  },

  reviews: [ReviewSchema],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;

// tax:{
// type:String,
// required:[true,"Tax is required"]
// },
// totalPrice:{
//     type:String,
// },
