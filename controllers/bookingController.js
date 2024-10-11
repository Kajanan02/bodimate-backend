import asyncHandler from "express-async-handler";
import Booking from "../modals/bookingModal.js";
import res from "express/lib/response.js";
import e from "express";

const createBooking = asyncHandler(async (req, res) => {
    const {
        studentName,
        boardingId,
        ownerName,
        boardingName,
        checkInDate,
        checkOutDate,
        memberCount,
        pricePerMonth,
    } = req.body;

    const booking = await Booking.create({
        studentName,
        boardingId,
        ownerName,
        boardingName,
        checkInDate,
        checkOutDate,
        memberCount,
        pricePerMonth,})

    if (booking) {
        res.status(201).json(booking)
    } else {
        res.status(400).json({status: "FAILED", message: "Invalid Data"});
    }
});

const deleteBooking = asyncHandler(async (req,res) => {
    const booking = await Booking.findById(req.params.id);
    if(booking){
        await booking.deleteOne();
        res.json({message: 'Booking Removed'});
    } else {
        res.status(404).json({status: "FAILED", message: "Booking is not found"})
    }
})

const getAllBookings = asyncHandler(async (req, res) => {
    const booking = await Booking.find({}).sort({createdAt: -1});
    if (booking){
        res.json(booking);
    } else {
        res.status(400).json({status: "FAILED", message: "Booking data not found"});
    }
});




export {createBooking, getAllBookings, deleteBooking};