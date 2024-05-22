import asyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import generateToken from "../utils/generateToken.js";

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
    });

    if (user) {
        generateToken(res, user._id)
        const userData = {
            _id: user._id,
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
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        }
        res.status(201).json(userData)
    } else {
        res.status(400);
        throw new Error('Invalid user Data')
    }
})

export {registerUser}

