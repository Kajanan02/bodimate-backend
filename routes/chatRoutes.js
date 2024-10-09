import express from 'express';
import {createChat, getChats} from "../controllers/chatController.js";

const router = express.Router();
router.route('/messages').post(createChat).get(getChats);



export default router;