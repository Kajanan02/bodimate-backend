import express from "express";

import {createFavouriteBoarding, deleteFavouriteBoarding, getAllFavouriteBoardings, getOneFavouriteBoarding} from "../controllers/favouriteBoardingController.js";

const router = express.Router();

router.route('/createFavourite').post(createFavouriteBoarding);
router.route('/getAllFavourite').get(getAllFavouriteBoardings);
router.route('/deleteFavourite/:id').delete(deleteFavouriteBoarding)

export default router;