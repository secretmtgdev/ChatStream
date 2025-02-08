import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        channelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel'},
        sender: { type: String, required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    },
    { collection: 'messages' }
);

const Message = mongoose.model('Message', messageSchema);
export default Message;