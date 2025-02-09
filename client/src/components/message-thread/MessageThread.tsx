import React from "react";

import MessageInput from "../message-input/MessageInput";
import MessageList from "../message-list/MessageList";

import './MessageThread.css';

const MessageThread: React.FC = () => {
    return (
        <div className='message-thread'>
            <MessageList />
            <MessageInput />
        </div>        
    );
};

export default MessageThread;