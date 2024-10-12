import asyncHandler from "express-async-handler";
import Chat from "../modals/chatModal.js";

const createChat = asyncHandler(async (req, res) => {
    const {name, senderId,receiverId, message,userType} = req.body;

    if (!name || !senderId || !message) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const newChat = new Chat({
        name,
        senderId,
        receiverId,
        message,
        userType
    });

    newChat.save()
        .then((msg) => res.status(201).json(msg))
        .catch((err) => res.status(500).json({error: err.message}));
})

const getChats = asyncHandler(async (req, res) => {
    Chat.find()
        .then((chats) => res.status(200).json(chats))
        .catch((err) => res.status(500).json({error: err.message}));
})

export {createChat, getChats};