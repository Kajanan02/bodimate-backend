import express from 'express';
import {
    forgotPassword,
    loginUser,
    logoutUser,
    registerUser,
    resetPassword,
    verifyOTP
} from '../controllers/userController.js';

const router = express.Router();



router.route('/register').post(registerUser);
router.route('/verifyOTP').post(verifyOTP);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/forgotPassword').post(forgotPassword);
router.route('/resetPassword').post(resetPassword);


export default router;