import express from "express";

import {
    createFavouriteBoarding,
    deleteFavouriteBoarding,
    getFavouriteBoardings
} from "../controllers/favouriteBoardingController.js";

const router = express.Router();

router.route('/createFavourite').post(createFavouriteBoarding);
router.route('/getAllFavourite').get(getFavouriteBoardings);
router.route('/deleteFavourite/:id').delete(deleteFavouriteBoarding)

export default router;