import express from 'express';
import {createBoarding, editBoarding, getAllBoarding, deleteBoarding, getOneBoarding} from "../controllers/boardingController.js";

const router = express.Router();

router.route('/createBoarding').post(createBoarding);
router.route('/getAllBoarding').get(getAllBoarding);
router.route('/getOneBoarding/:id').get(getOneBoarding).put(editBoarding);
router.route('/editBoarding/:id').put(editBoarding);
router.route('/deleteBoarding/:id').delete(deleteBoarding);


export default router;