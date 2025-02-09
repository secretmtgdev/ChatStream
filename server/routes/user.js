import express from 'express';

import User from '../models/User.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({
            error: '[INTERAL SERVER ERROR] - Could not get user details'
        });
    }
});

export default router;