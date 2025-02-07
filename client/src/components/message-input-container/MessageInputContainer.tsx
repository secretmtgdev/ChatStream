import React, { useState } from 'react';
import SendButton from '../send-button/SendButton';
import MessageInput from '../message-input/MessageInput';

import './MessageInputContainer.css';
import { Message } from '../../utils/interfaces';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../store/messagesSlice';

export interface MessageInputContainerProps {
    
}

const MessageInputContainer: React.FC<MessageInputContainerProps> = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const handleMessageChange = (newMessage: string) => {
        setMessage(newMessage);
    }

    const handleSendMessage = () => {
        if (message.trim()) {
            const newMessageObject: Message = {
                id: 3,
                sender: 'John',
                content: message,
                timestamp: new Date().toISOString()
            };
            dispatch(addMessage(newMessageObject));
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