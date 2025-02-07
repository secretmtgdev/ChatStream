import React, { useState } from "react";

import './MessageInput.css';

export interface MessageInputProps {
    message: string;
    onMessageChange: (newMessage: string) => void;
    rows?: number;
    cols?: number;
}

const MessageInput = ({message, onMessageChange, rows, cols}: MessageInputProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onMessageChange(event.target.value);
    }

    return (
        <div className='message-input flex-container flex-col'>
            <label htmlFor='message-input-textarea'>Enter message:</label>
            <textarea
                value={message}
                onChange={handleChange}
                placeholder='The world is your oyster...'
                id='message-input-textarea'
                rows={rows ?? 10}
                cols={cols ?? 100}
                maxLength={100000}
            />
        </div>
    )
};

export default MessageInput;