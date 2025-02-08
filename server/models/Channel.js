import mongoose from "mongoose";

// Atlas will automatically create _id
const channelSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    },
    { collection: 'channels' }
);

const Channel = mongoose.model('Channel', channelSchema);
export default Channel;