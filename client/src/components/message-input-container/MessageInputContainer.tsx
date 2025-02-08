import React, { useContext, useState } from 'react';
import SendButton from '../send-button/SendButton';
import MessageInput from '../message-input/MessageInput';

import './MessageInputContainer.css';
import { Message } from '../../utils/interfaces';
import { useDispatch } from 'react-redux';
import { sendMessage } from '../../store/messagesSlice';
import { AppDispatch } from '../../store/store';
import SocketContext from '../socket-provider/SocketProvider';

export interface MessageInputContainerProps {}

const MessageInputContainer: React.FC<MessageInputContainerProps> = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);

    const handleMessageChange = (newMessage: string) => {
        setMessage(newMessage);
    }

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessageObject: Message = {
                sender: 'John',
                content: message,
                timestamp: new Date().toISOString()
            };
            try {
                const response = await dispatch(sendMessage(newMessageObject));
                if (socket && response.payload) {
                    socket.emit('newMessage', response.payload);
                }
            } catch (error) {
                console.error(`Couldn't send the message out: ${error}`);
            }
            setMessage('');
        }
    }

    return (
        <div className='message-input-container flex-container flex-row'>
            <MessageInput message={message} onMessageChange={handleMessageChange} />
            <div className='flex-container flex-center'>
                <SendButton label='Send Message' onClick={handleSendMessage} disabled={!message.trim()} />
            </div>
        </div>
    )
};

export default MessageInputContainer;