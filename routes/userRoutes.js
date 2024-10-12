import express from 'express';
import {
    deleteUser,
    forgotPassword, getBoardingOwners, getStudents,
    loginUser,
    logoutUser,
    registerUser,
    resetPassword, updateUser,
    verifyOTP
} from '../controllers/userController.js';
import {protect} from "../middleware/authMiddleware.js";
import {get} from "mongoose";

const router = express.Router();



router.route('/register').post(registerUser);
router.route('/verifyOTP').post(verifyOTP);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword').post(resetPassword);
router.put('/update/:id', protect, updateUser);
router.route('/getBoardingOwners').get(getBoardingOwners)
router.route('/getStudents').get(getStudents);
router.route('/deleteUser/:id').delete(deleteUser);


export default router;