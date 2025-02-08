import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { rateLimit } from 'express-rate-limit';

import connectDB from './config/db.js';
import messageRoutes from './routes/messages.js';
import channelRoutes from './routes/channels.js';

dotenv.config();

const PORT = process.env.PORT || 5000; // should be 5000 if the config is loaded properly
const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeads: 'draft-8',
    legacyHeaders: false
});

const app = express();
const appServer = http.createServer(app);
const io = new Server(appServer);
app.use(cors());
app.use(rateLimiter);
app.use(express.json());


connectDB();

io.on('connection', (socket) => {
    console.log('Connected to the socket!');
    socket.emit('connected', {
        message: 'Successfully connected to the socket'
    });

    socket.on('newMessage', (message) => {
        console.log(`Received message: ${message}`);
        io.emit('message', message);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from socket!');
    })
});

app.use('/api/messages', messageRoutes);
app.use('/api/channels', channelRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));