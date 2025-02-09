import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ChannelsStateSlice, Message, UserStateSlice } from '../../utils/interfaces';
import { sendMessage } from '../../store/messagesSlice';
import { AppDispatch } from '../../store/store';
import SocketContext from '../socket-provider/SocketProvider';

import './MessageInput.css';

const MessageInput: React.FC = () => {
    const [message, setMessage] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const socket = useContext(SocketContext);
    const channelName = useSelector((state: ChannelsStateSlice) => state.channels.selectedChannel);
    const user = useSelector((state: UserStateSlice) => state.user.user);

    const handleMessageChange = (newMessage: string) => {
        setMessage(newMessage);
    }

    const handleSendMessage = async () => {
        if (message.trim()) {
            const newMessageObject: Message = {
                channelName: channelName,
                sender: user?.username ?? 'John',
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

    const isButtonDisabled = !message.trim();
    return (
        <div className='message-input-container flex flex-row'>
            <div className='message-input flex flex-col'>
                <label htmlFor='message-input-textarea'>Enter message:</label>
                <textarea
                    value={message}
                    onChange={(e) => handleMessageChange(e.target.value)}
                    placeholder='The world is your oyster...'
                    id='message-input-textarea'
                    rows={10}
                    cols={100}
                    maxLength={100000}
                />
            </div>
            <div className='flex flex-center'>
                <button
                    type='button'
                    className={['button', 'send-button', isButtonDisabled && 'disabled'].filter(Boolean).join(' ')} onClick={handleSendMessage} disabled={isButtonDisabled}>
                    Send Message
                </button>
            </div>
        </div>
    )
};

export default MessageInput;