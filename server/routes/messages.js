import express from 'express';
import Message from '../models/Message.js';
import Channel from '../models/Channel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
});

router.get('/:channelName', async (req, res) => {
    try {
        const { channelName } = req.params;
        if (!channelName) {
            return res.status(400).json({
                error: '[BAD REQUEST] - Channel name was not passed.'
            });
        }

        const channel = await Channel.findOne({ name: channelName });
        if (!channel) {
            return res.status(404).json({
                error: '[NOT FOUND] - Channel was not found.'
            })
        }

        const messages = await Message.find({ channelId: channel._id }).sort({ timestamp: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({
            error: `[INTERNAL SERVER ERROR] - Failed to get messages for channel ${channelName}`
        })
    }
});

router.post('/', async (req, res) => {
    try {
        const { sender, content, channelName } = req.body;
        if (!sender || !content) {
            return res.status(400).json({
                message: '[BAD REQUEST] - Both sender and content are required'
            });
        }

        const channel = await Channel.findOne({ name: channelName });
        if (!channel) {
            return res.status(404).json({
                error: '[NOT FOUND] - Could not find the channel'
            })
        }

        const newMessage = new Message({
            channelId: channel._id,
            sender,
            content,
            timestamp: new Date()
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({
            message: '[INTERAL SERVER ERROR] - Failed to save the new message in MongoDB cluster'
        });
    }
});

export default router;