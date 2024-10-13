import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    studentName : {
        type : String,
    },
    boardingId : {
        type : mongoose.Schema.Types.ObjectId,
        ref :"Boarding",
        required: true
    },
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    studentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    ownerName: {
        type: String,
    },
    boardingName: {
        type : String,
    },
    amount:{
      type: Number,
      required: true
    },
    checkInDate : {
        type: Date,
        required: true
    },
    checkOutDate : {
        type: Date,
        required: true
    },
    memberCount: {
        type: Number,
        required: true
    },
    pricePerMonth: {
        type: String,
    },
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
