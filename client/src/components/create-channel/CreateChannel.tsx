import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { createChannel, setSelectedChannel } from "../../store/channelSlice";
import { Channel } from "../../utils/interfaces";
import { AppDispatch } from "../../store/store";

import './CreateChannel.css';

const CreateChannel: React.FC = () => {
    const [channelName, setChannelName] = useState('');
    const [creatingChannel, setCreatingChannel] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleChannelNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChannelName(event.target.value)
    }
    
    const handleCreateChannel = async () => {
        setCreatingChannel(true);
        const newChannelObject: Channel = {
            name: channelName,
            participants: []
        }
        try {
            const response = await dispatch(createChannel(newChannelObject));
        } catch (error) {
            console.error(`Failed to create a new channel: ${error}`);
        }
        
        setCreatingChannel(false);
        setChannelName('');
        dispatch(setSelectedChannel(channelName));
    }
    
    return (
        <div id='create-channel'>
            <div className='input-container'>
                <label htmlFor='input-channel-name'>New Channel Name</label>
                <input 
                    id='input-channel-name'
                    value={channelName}
                    type='text'
                    onChange={handleChannelNameChange} 
                />
            </div>            
            <button 
                className={['button', 'channel-button', creatingChannel || !channelName.trim() && 'disabled'].filter(Boolean).join(' ')}
                type='button'
                onClick={handleCreateChannel}
                disabled={creatingChannel || !channelName.trim()}
            >
                Create Channel
            </button>
        </div>
    );
};

export default CreateChannel;