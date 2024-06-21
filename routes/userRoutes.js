import express from 'express';
import {loginUser, registerUser, verifyOTP} from '../controllers/userController.js';

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/verifyOTP').post(verifyOTP);
router.route('/login').post(loginUser);

export default router;