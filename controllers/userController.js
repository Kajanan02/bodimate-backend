import asyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import UserOTPVerification from "../modals/UserOTPVerification.js";
import sendEmail from "../utils/email-service/email.js";
import Boarding from "../modals/boardingModal.js";

const registerUser = asyncHandler(async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        username,
        role,
        contactNo,
        gender,
        address,
        nicNo,
        nicFront,
        nicBack,
        isVerified,
        profilePic
    } = req.body;
    const userExists = await User.findOne({email})
    if (userExists) {
        res.status(400).json({status: "FAILED", message: "User already exists"});
    }

    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role,
        contactNo,
        username,
        gender,
        address,
        nicNo,
        nicFront,
        nicBack,
        isVerified,
        profilePic
    }).then((user) => {
        //sendOTP(user, res)

        res.status(201).json(user)
    }).catch((error) => {
        res.status(400).json({status: "FAILED", message: error});


    })
})


const sendOTP = asyncHandler(async ({_id, email}, res) => {
    console.log(_id, email, "sendOTP");
    try {
        const id = _id;
        const otp = Math.floor(100000 + Math.random() * 900000);
        const subject = "Email Verification OTP from Bodimate";
        const body = `<h1>Your OTP is ${otp}</h1>`;

        const salt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(otp.toString(), salt);

        const currentTime = new Date();
        const expirationTime = new Date(currentTime.getTime() + 5 * 60 * 1000); // 5 minutes in the future

        const newUserOTPVerification = new UserOTPVerification({
            userId: id,
            otp: hashedOTP,
            email,
            createdAt: currentTime,
            expiredAt: expirationTime
        });

        console.log(`OTP: ${otp}, CreatedAt: ${currentTime.toISOString()}, ExpiredAt: ${expirationTime.toISOString()}`);
        await newUserOTPVerification.save();
        await sendEmail(email, subject, body);

    } catch (error) {
        res.status(400).json({
            status: "FAILED",
            message: "Error sending OTP",
            error: error.message
        });
    }
});


const verifyOTP = asyncHandler(async (req, res) => {
    let userId;

    if (req.body.userId) {
        userId = req.body.userId;
    } else if (req.user && req.user._id) {
        userId = req.user._id;
    } else if (req.body.email) {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).json({status: "FAILED", message: "No user found", data: {userId}});
        } else {
            userId = user._id;
        }
    } else {
        return res.status(400).json({status: "FAILED", message: "No user found", data: {userId}});
    }

    const {otp} = req.body;
    console.log(userId, otp, "verifyOTP");

    try {
        const userOTPVerification = await UserOTPVerification.findOne({userId});
        if (!userOTPVerification) {
            return res.status(400).json({status: "FAILED", message: "OTP not found", data: {userId}});
        }

        console.log(userOTPVerification.expiredAt)

        const currentTime = new Date(userOTPVerification.createdAt);
        const expiredAt = new Date(userOTPVerification.expiredAt);

        if (expiredAt < currentTime) {
            return res.status(400).json({status: "FAILED", message: "OTP expired", data: {userId}});
        }

        if (userOTPVerification.isExpired) {
            return res.status(400).json({status: "FAILED", message: "OTP expired", data: {userId}});
        }

        const isMatch = await bcrypt.compare(otp.toString(), userOTPVerification.otp);
        if (isMatch) {
            const user = await User.findById(userId);
            user.isEmailVerified = true;
            await user.save();
            userOTPVerification.isExpired = true;
            await userOTPVerification.save();
            return res.status(200).json({
                status: "SUCCESS",
                message: "OTP verified successfully",
                data: {userId}
            });
        } else {
            return res.status(400).json({status: "FAILED", message: "Invalid OTP", data: {userId}});
        }
    } catch (error) {
        res.status(400).json({status: "FAILED", message: "Server error", error: error.message});
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    console.log(user, "User")
    console.log(password, "Password")
    console.log(email, "email")
    console.log(user?.matchPassword(password), "Match Password")
    if (user && (await user.matchPassword(password))) {
        let token = generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            contactNo: user.contactNo,
            gender: user.gender,
            address: user.address,
            nicNo: user.nicNo,
            nicFront: user.nicFront,
            nicBack: user.nicBack,
            isVerified: user.isVerified,
            isEmailVerified: user.isEmailVerified,
            profilePic: user.profilePic,
            token: token
        })
    } else {
        const salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash("123456", salt);
        console.log("Password", password)
        res.status(400).json({status: "FAILED", message: "Invalid email or password"});
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({message: "User logged out successfully"})

})

const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (user) {
        sendOTP(user, res);
        res.status(200).json({message: "OTP sent successfully"})
    } else {
        res.status(404).json({status: "FAILED", message: "User not found"});
    }
})


const resetPassword = asyncHandler(async (req, res) => {
    const {email, otp, password} = req.body;
    const userOTPVerification = await UserOTPVerification.findOne({email})

    if (userOTPVerification.expiredAt < Date.now()) {
        return res.status(400).json({status: "FAILED", message: "OTP expired", data: {email}});
    } else if (userOTPVerification.isExpired) {
        return res.status(400).json({status: "FAILED", message: "OTP expired", data: {email}});
    } else if (userOTPVerification) {
        const isMatch = await bcrypt.compare(otp.toString(), userOTPVerification.otp);
        if (isMatch) {

            const user = await User.findById(userOTPVerification.userId)
            user.password = password;
            userOTPVerification.isExpired = true;
            await userOTPVerification.save();
            await user.save();
            res.status(200).json({message: "Password reset successfully"})
        } else {
            res.status(400).json({status: "FAILED", message: "Invalid OTP"});

        }
    } else {
        res.status(400).json({status: "FAILED", message: "OTP not found"});
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const user = await User.findById({_id});
    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        user.contactNo = req.body.contactNo || user.contactNo;
        user.gender = req.body.gender || user.gender;
        user.address = req.body.address || user.address;
        user.nicNo = req.body.nicNo || user.nicNo;
        user.nicFront = req.body.nicFront || user.nicFront;
        user.nicBack = req.body.nicBack || user.nicBack;
        user.profilePic = req.body.profilePic || user.profilePic;
        user.isVerified = req.body.isVerified || user.isVerified;
        user.isEmailVerified = req.body.isEmailVerified || user.isEmailVerified;

        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            role: updatedUser.role,
            contactNo: updatedUser.contactNo,
            gender: updatedUser.gender,
            address: updatedUser.address,
            nicNo: updatedUser.nicNo,
            nicFront: updatedUser.nicFront,
            nicBack: updatedUser.nicBack,
            profilePic: updatedUser.profilePic,
            isVerified: updatedUser.isVerified,
            isEmailVerified: updatedUser.isEmailVerified,
        })
    } else {
        res.status(404).json({status: "FAILED", message: "User not found"});

    }
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({ _id: { $ne: "6706daa45592c323718263b7" } });
    if(users){
        res.status(200).json(users);
    } else {
        res.status(400).json({status: "FAILED", message: "No users found"});
    }
})

// const getBoardingOwners = asyncHandler(async (req, res) => {
//     const boardingOwners = await User.find({ role: 'boarding owner' });  // Filter by role
//     res.status(200).json(boardingOwners);
// });
const getBoardingOwners = asyncHandler(async (req, res) => {
    try {
        // Find users whose role is 'boarding owner'
        const boardingOwners = await User.find({ role: 'boardingOwner' }).sort({ createdAt: -1 });

        if (boardingOwners && boardingOwners.length > 0) {
            res.json(boardingOwners);
        } else {
            res.status(404).json({ status: "FAILED", message: "Boarding Owner not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: "Server error", error: error.message });
    }
});

// const getStudents = asyncHandler(async (req, res) => {
//     try {
//         // Find users whose role is 'boarding owner'
//         const students = await User.find({ role: 'student' }).sort({ createdAt: -1 });
//
//         if (students && students.length > 0) {
//             res.json(students);
//         } else {
//             res.status(404).json({ status: "FAILED", message: "Student not found" });
//         }
//     } catch (error) {
//         res.status(500).json({ status: "FAILED", message: "Server error", error: error.message });
//     }
// });

const getStudents = asyncHandler(async (req, res) => {
    try {
        // Find users whose role is either 'student' or 'user'
        const students = await User.find({ role: { $in: ['student', 'user'] } }).sort({ createdAt: -1 });

        if (students && students.length > 0) {
            res.json(students);
        } else {
            res.status(404).json({ status: "FAILED", message: "Student or User not found" });
        }
    } catch (error) {
        res.status(500).json({ status: "FAILED", message: "Server error", error: error.message });
    }
});

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await user.deleteOne();
        res.json({message: 'User removed'});
    } else {
        res.status(404).json({status: "FAILED", message: "User not found"});
    }
})


export {registerUser, verifyOTP, loginUser, logoutUser, forgotPassword, resetPassword,updateUser,getAllUsers, getBoardingOwners,getStudents, deleteUser}

