import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../store/messagesSlice";
import { RootState } from "../../store/store";
import { Message } from "../../utils/interfaces";
import MessageInputContainer from "../message-input-container/MessageInputContainer";
import MessageList from "../message-list/MessageList";

const MessageThread: React.FC = () => {
    const dispatch = useDispatch();
    const messages = useSelector((state: RootState) => state.messages.messages);

    const fetchMessages = () => {
        setTimeout(() => {
            const mockMessages: Message[] = [
                { id: 1, sender: 'John', content: 'Hi', timestamp: '2025-02-07T07:00:00'},
                { id: 2, sender: 'Jane', content: 'Hi', timestamp: '2025-02-07T12:00:00'},
                { id: 3, sender: 'John', content: 'Alrighty then...', timestamp: '2025-02-07T12:01:00'},                
            ];
            dispatch(setMessages(mockMessages));
        }, 0);
    }

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <div className='message-thread'>
            <MessageList messages={messages} />
            <MessageInputContainer />
        </div>        
    );
};

export default MessageThread;