import express from 'express';
import {createChat, getChatById, getChats} from "../controllers/chatController.js";

const router = express.Router();
router.route('/messages').post(createChat).get(getChats);
router.route('/messages/:id').get(getChatById);



export default router;