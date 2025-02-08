import React, { useEffect, useState } from "react";
import MessageInputContainer from "../message-input-container/MessageInputContainer";
import MessageList from "../message-list/MessageList";

const MessageThread: React.FC = () => {
    return (
        <div className='message-thread'>
            <MessageList />
            <MessageInputContainer />
        </div>        
    );
};

export default MessageThread;