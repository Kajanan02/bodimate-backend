import express from 'express';
import {createBooking, deleteBooking, getAllBookings, getOneBooking} from "../controllers/bookingController.js";

const router = express.Router();

router.route('/createBooking').post(createBooking);
router.route('/getAllBookings').get(getAllBookings);
router.route('/deleteBooking/:id').delete(deleteBooking)
router.route("/getOneBoarding/:id").get(getOneBooking)

export default router;