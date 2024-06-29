import asyncHandler from "express-async-handler";
import ContactUs from "../modals/contactUsModal.js";


const sendMessage = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        phoneNo,
        messageTopic,
        message
    } = req.body;

    const contactUs = await ContactUs.create({
        name,
        email,
        phoneNo,
        messageTopic,
        message})

    if (contactUs) {
        res.status(201).json(contactUs)
    } else {
        res.status(400);
        throw new Error("Invalid Data")
    }
});

const getOneMessage = asyncHandler(async (req, res) => {
    let _id = req.params.id
    const contactUs = await ContactUs.findById(_id)
    if (contactUs) {
        res.json(contactUs)
    }
});

const getMessages = asyncHandler(async (req, res) => {
    const contactUs = await ContactUs.find({}).sort({ createdAt: -1 });
    if (contactUs) {
        res.json(contactUs);
    } else {
        res.status(404);
        throw new Error('Message not found')
    }
});



export {sendMessage, getMessages, getOneMessage};