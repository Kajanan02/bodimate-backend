import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    name: String,
    userId: String,
    message: String,
    userType: { type: String, default: 'user' },
    timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model('Chat', ChatSchema);
export default Chat;