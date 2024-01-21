const express = require("express");
const Car = require("../model/car");
const Person = require("../model/person");
const router = express.Router();

router.post("/add-car", async (req, res) => {
  try {
    const {
      name,
      rating,
      carType,
      capacity,
      steering,
      gasoline,
      petrol,
      ratePerDay,
    } = req.body;

    const existingCar = await Car.findOne({ name });
    if (existingCar) {
      return res.status(400).json({ message: "Car Already Exists" });
    }

    const newCar = new Car({
      name,
      rating,
      carType,
      capacity,
      steering,
      gasoline,
      petrol,
      ratePerDay,
    });

    const savedCar = await newCar.save();
    return res
      .status(201)
      .json({ car: savedCar, message: "Car added successfully" });
  } catch (error) {
    console.error("Error adding car:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-all-cars", async (req, res) => {
  try {
    const allCars = await Car.find();
    return res.status(200).json({ cars: allCars });
  } catch (error) {
    console.error("Error getting all cars:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get-car/:carId", async (req, res) => {
  try {
    const { carId } = req.params;
    const car = await Car.findById(carId).populate({
      path: "reviews.user",
      select: "name occupation",
    });
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(200).json({ car });
  } catch (error) {
    console.error("Error getting car by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/add-review", async (req, res) => {
  try {
    const { carId, userId, rating, reviewMessage } = req.body;

    const car = await Car.findById(carId);
    const user = await Person.findById(userId);

    if (!car || !user) {
      return res.status(404).json({ message: "Car or user not found" });
    }

    const newReview = {
      rating,
      user: userId,
      reviewMessage,
    };

    car.reviews.push(newReview);
    await car.save();

    return res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});




module.exports = router;
