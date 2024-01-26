
const express=require("express");
const router=express.Router();
const Car=require("../model/car")
const Rental=require("../model/rental")
const Person=require("../model/person")
// const {verifyAccessToken}=require("../utils/verifyToken")

router.post("/rent/:carId",async(req,res)=>{
    try {
        const userId=req.user.userId
        const carId=req.params
        const{billingInfo,rentalInfo,paymentMethod}=req.body

        const car= await Car.findById(carId);
        const user=await Person.findById(userId);

        if(!car || !user){
            return res.status(500).json({message:`${!car?"Car":"User"} not found!`})
        }

        const rentalData={
            billingInfo:billingInfo,
            rentalInfo:rentalInfo,
            paymentMethod:paymentMethod
        }

        const newRental = await Rental.create(rentalData);


        console.log(billingInfo,rentalInfo,paymentMethod);
        console.log("UserId",userId);
        console.log("carID",carId);

        return res.status(201).json({message:"Car reserved successfully!"})
    } catch (error) {
        return res.status(500).json({message:"Interal Server Error"})
    }
})



module.exports=router