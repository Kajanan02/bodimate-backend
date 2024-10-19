import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
    universityName: {
        type: String,
        required: true,
        enum:[
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
    
    district: {
        type:String,
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
    universityImg: {
        type: String
    },
    location: {
       type: Object
    }
}, {
    timestamps: true
});

const University = mongoose.model('University', universitySchema);
export default University;
