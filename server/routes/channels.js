import express from 'express';
import Channel from '../models/Channel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const channels = await Channel.find();
        res.json(channels);
    } catch (error) {
        res.status(500).json({
            message: '[INTERNAL SERVER ERROR] - Failed to find channels'
        });
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, participants } = req.body;
        if (!name || !participants) {
            return res.status(400).json({
                error: '[BAD REQUEST] - Missing name or participants'
            });
        }

        const newChannel = new Channel({
            name,
            participants
        });

        await newChannel.save();
        res.status(201).json(newChannel);
    } catch (error) {
        res.status(500).json({
            error: '[INTERNAL SERVER ERROR] - Failed to save channel to atlas'
        });
    }
});

export default router;