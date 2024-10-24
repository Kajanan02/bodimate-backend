import mongoose from "mongoose";

const  favouriteBoardingSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    boardingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Boarding",
        required: true
    }
}, {
    timestamps: true
});
