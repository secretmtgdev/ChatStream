import express from 'express';
import Message from '../models/Message.js';

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

router.post('/', async (req, res) => {
    try {
        const { sender, content } = req.body;
        if (!sender || !content) {
            return res.status(400).json({
                message: '[BAD REQUEST] - Both sender and content are required'
            });
        }

        const newMessage = new Message({
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