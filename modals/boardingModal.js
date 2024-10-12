import mongoose from "mongoose";

const boardingSchema = new mongoose.Schema({
    boardingName: {
        type: String,
        required: true
    },
    boardingOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    boardingNo: {
        type: Number,
    },
    ownerName: {
        type: String,
    },
    ownerNIC: {
        type: String,
    },
    street: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true,
        enum: ["Ampara",
            "Anuradhapura",
            "Badulla",
            "Batticaloa",
            "Colombo",
            "Galle",
            "Gampaha",
            "Hambantota",
            "Jaffna",
            "Kalutara",
            "Kandy",
            "Kegalle",
            "Kilinochchi",
            "Kurunegala",
            "Mannar",
            "Matale",
            "Matara",
            "Monaragala",
            "Mullativu",
            "Nuwara Eliya",
            "Polonnaruwa",
            "Puttalam",
            "Ratnapura",
            "Trincomalee",
            "Vavuniya"]
    },
    province: {
        type: String,
        required: true,
        enum: [
            "Central Province",
            "Eastern Province",
            "Northern Province",
            "North Central Province",
            "North Western Province",
            "Sabaragamuwa Province",
            "Southern Province",
            "Uva Province",
            "Western Province"]
    },
    boardingType: {
        type: String,
        // required: true,
    },
    stayPreference: {
        type: String,
        // required: true,
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
    location: {
        type: Object
    },
    distance: {
        type: String,
        required: true
    },
    nearestUniversity: {
        type: String,
        required: true,
        enum: [
            "Eastern University, Sri Lanka (EUSL)",
            "Open University of Sri Lanka, The (OUSL)",
            "Rajarata University of Sri Lanka (RUSL)",
            "Sabaragamuwa University of Sri Lanka (SUSL)",
            "South Eastern University of Sri Lanka (SEUSL)",
            "University of Colombo (CBO)",
            "University of Jaffna (UJA)",
            "University of Kelaniya (KLN)",
            "University of Moratuwa (MRT)",
            "University of Peradeniya (PDN)",
            "University of Ruhuna (RUH)",
            "University of Sri Jayewardenepura (SJP)",
            "University of the Visual and Performing Arts (UVPA)",
            "Uva Wellassa University of Sri Lanka (UWU)",
            "Wayamba University of Sri Lanka (WUSL)"
        ]
    },
    advancedPayment: {
        type: String,
        required: true
    },
    boardingPic: {
        type: [String]
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Boarding = mongoose.model('Boarding', boardingSchema);
export default Boarding;
