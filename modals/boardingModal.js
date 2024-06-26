import mongoose from "mongoose";

const boardingSchema = new mongoose.Schema({
    boardingName: {
        type: String,
        required: true
    },
    boardingNo: {
        type: Number,
        required: true
    },
    ownerName: {
        type: String,
    },
    ownerNIC: {
        type: String,
    },
    street: {
        type:String,
        required: true
    },
    city: {
        type:String,
        required: true
    },
    district: {
        type:String,
        required: true
    },
    province: {
        type:String,
        required: true
    },
    boardingType: {
        type: String,
        required: true
    },
    stayPreference: {
        type: String,
        required: true
    },
    facilities: {
        type: [String],
        required: true
    },
    membersCount: {
        type: Number,
        required: true
    },
    noOfRooms: {
        type: Number,
        required: true
    },
    pricePerMonth: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    nearestUniversity: {
        type: String,
        required: true
    },
    advancedPayment: {
        type: String,
        required: true
    },
    boardingPic: {
        type: [String]
    }
}, {
    timestamps: true
});

const Boarding = mongoose.model('Boarding', boardingSchema);
export default Boarding;