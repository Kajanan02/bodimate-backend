import express from 'express';
import {createBooking, deleteBooking, getAllBookings} from "../controllers/bookingController.js";

const router = express.Router();

router.route('/createBooking').post(createBooking);
router.route('/getAllBookings').get(getAllBookings);
router.route('/deleteBooking/:id').delete(deleteBooking)

export default router;