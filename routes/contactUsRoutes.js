import express from 'express';
import {sendMessage, getMessages, getOneMessage} from "../controllers/contactUsController.js";

const router = express.Router();


router.route('/sendMessage').post(sendMessage);
router.route('/getAllMessages').get(getMessages);
router.route('/getOneMessage/:id').get(getOneMessage);


export default router;






