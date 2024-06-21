import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserOTPVerificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiredAt: {
        type: Date,
        default: Date.now() + 5 * 60 * 1000
    }
})

const UserOTPVerification = mongoose.model('UserOTPVerification', UserOTPVerificationSchema);
export default UserOTPVerification;
