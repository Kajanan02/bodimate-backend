import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    studentName : {
        type : String,
        required: true
    },
    boardingId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    boardingName: {
        type : String,
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
        required: true
    },
}, {
    timestamps: true
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
