import asyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import UserOTPVerification from "../modals/UserOTPVerification.js";
import senEmail from "../utils/email-service/email.js";

const registerUser = asyncHandler(async (req, res) => {
    const {
        firstName, lastName, email, password, role, contactNo, gender, address, nicNo, nicFront, nicBack, isVerified
    } = req.body;
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        firstName, lastName, email, password, role, contactNo, gender, address, nicNo, nicFront, nicBack, isVerified
    }).then((user) => {
        sendOTP(user, res)
    }).catch((error) => {
        res.status(400);
        throw new Error(error)
    })
})


const sendOTP = asyncHandler(async ({_id, email}, res) => {

    console.log(_id, email, "sendOTP")
    try {
        const id = _id;
        const otp = Math.floor(100000 + Math.random() * 900000);
        const subject = "Email Verification OTP from Bodimate"
        const body = `<h1>Your OTP is ${otp}</h1>`

        const salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(otp.toString(), salt);

        const newUserOTPVerification = new UserOTPVerification({
            userId: id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiredAt: Date.now() + 5 * 60 * 1000
        })

        await newUserOTPVerification.save();
        await senEmail(email, subject, body);

        res.status(200).json({
            status: "PENDING",
            message: "OTP sent successfully",
            messageUser: "User created successfully, Please verify your email",
            data: {userId: id, email: email}
        })
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }

})

const verifyOTP = asyncHandler(async (req, res) => {

    const {userId, otp} = req.body;
    console.log(userId, otp, "verifyOTP")
    try {
        const userOTPVerification = await UserOTPVerification.findOne({userId})
        if (!userOTPVerification) {
            res.status(400).json({status: "FAILED", message: "OTP not found", data: {userId: userId}})
        } else {
            if (userOTPVerification.expiredAt < Date.now()) {
                res.status(400).json({status: "FAILED", message: "OTP expired", data: {userId: userId}})
            } else {
                if (userOTPVerification) {
                    const isMatch = await bcrypt.compare(otp.toString(), userOTPVerification.otp);
                    if (isMatch) {
                        const user = await User.findById(userId)
                        user.isEmailVerified = true;
                        await user.save();
                        res.status(200).json({
                            status: "SUCCESS",
                            message: "OTP verified successfully",
                            data: {userId: userId}
                        })
                    } else {
                        res.status(400).json({status: "FAILED", message: "Invalid OTP", data: {userId: userId}})
                    }
                } else {
                    res.status(400).json({status: "FAILED", message: "OTP not found", data: {userId: userId}})
                }
            }
        }
    } catch (error) {
        res.status(400);
        throw new Error(error)
    }
})

const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user && (await user.matchPassword(password))) {
        let token = generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            contactNo: user.contact,
            gender: user.gender,
            address: user.address,
            nicNo: user.nicNo,
            nicFront: user.nicFront,
            nicBack: user.nicBack,
            isVerified: user.isVerified,
            isEmailVerified: user.isEmailVerified,
            token: token
        })
    }
})

export {registerUser, verifyOTP, loginUser}

