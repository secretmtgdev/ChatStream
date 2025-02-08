import React, { useContext, useEffect, useState } from 'react';
import { ChannelsStateSlice, Message, MessagesStateSlice } from '../../utils/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { fetchByChannel, fetchMessages, sendMessage } from '../../store/messagesSlice';
import { AppDispatch } from '../../store/store';
import SocketContext from '../socket-provider/SocketProvider';

import './MessageList.css';

const MessageList: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [initialLoad, setInitialLoad] = useState<Boolean>(true);
    const socket = useContext(SocketContext);
    const dispatch = useDispatch<AppDispatch>();

    const messagesFromStore = useSelector((state: MessagesStateSlice) => state.messages.messages);
    const loading = useSelector((state: MessagesStateSlice) => state.messages.loading);
    const channel = useSelector((state: ChannelsStateSlice) => state.channels.selectedChannel);

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
        }

        dispatch(fetchByChannel(channel));
        if (socket) {
            socket.on('message', (newMessage) => {
                dispatch(sendMessage(newMessage));
            });
        }

        return () => {
            if (socket) {
                socket.off('message');
            }
        }
    }, [dispatch, socket]);

    useEffect(() => {
        setMessages(messagesFromStore);
    }, [messagesFromStore]);

    return (
        <div className='messages'>
            { loading && initialLoad ? (
                <p>Loading messages...</p>
            ): (
                <div>
                    {messages.map((message, idx) => (
                        <div key={idx} className='message'>
                            <p>
                                <strong>{message.sender}</strong> ({new Date(message.timestamp).toLocaleTimeString()})
                            </p>
                            <p>{message.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MessageList;