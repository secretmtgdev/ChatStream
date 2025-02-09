import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const router = express.Router();
const secret = process.env.JWT_SECRET || 'someKey';

router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                error: '[BAD REQUEST] - Email is already in use.'
            });
        }

        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({
            message: '[CREATED] - Registered the user.'
        });
    } catch (error) {
        res.status(500).json({
            error: '[INTERNAL SERVER ERROR] - Could not register user in Atlas.'
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                message: '[UNAUTHORIZED] - Sorry but the email/username could not be found.'
            });
        }
    
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: '[UNAUTHORIZED] - Sorry but the password does not match.'
            });
        }
    
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
            },
            secret,
            {
                expiresIn: "1d"
            }
        );
    
        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        res.status.apply(500).json({
            message: '[INTERNAL SERVER ERROR] - Failed to login on Atlas.'
        });
    }
});

export default router;