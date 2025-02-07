import React from 'react';
import { Message } from '../../utils/interfaces';

export interface MessageListProps {
    messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <div className='messages'>
            {messages.map((message) => (
                <div key={message.id} className='message'>
                    <p>
                        <strong>{message.sender}</strong>
                        ({new Date(message.timestamp).toLocaleTimeString()})
                    </p>
                    <p>{message.content}</p>
                </div>
            ))}
        </div>
    );
}

export default MessageList;