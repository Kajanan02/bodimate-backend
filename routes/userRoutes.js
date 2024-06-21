import express from 'express';
import {registerUser, verifyOTP} from '../controllers/userController.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/verifyOTP').post(verifyOTP);

export default router;