import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store/store";
import { Channel, ChannelsStateSlice } from "../../utils/interfaces";
import { fetchChannels, setSelectedChannel } from "../../store/channelSlice";

import './ChannelsList.css';
import { fetchByChannel } from "../../store/messagesSlice";

const ChannelList: React.FC = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [initialLoad, setInitialLoad] = useState<Boolean>(true);
    
    const dispatch = useDispatch<AppDispatch>();
    const channelsFromStore = useSelector((state: ChannelsStateSlice) => state.channels.channels);
    const loading = useSelector((state: ChannelsStateSlice) => state.channels.loading);

    useEffect(() => {
        if (initialLoad) {
            setInitialLoad(false);
        }

        dispatch(fetchChannels());
    }, [dispatch]);

    useEffect(() => {
        setChannels(channelsFromStore);
    }, [channelsFromStore]);

    const handleChannelClick = (channelName: string) => {
        dispatch(setSelectedChannel(channelName));
        dispatch(fetchByChannel(channelName));
    }

    return (
        <div>
            { loading && initialLoad ? (
                <p>Loading channels...</p>
            ): (
                <ul className='channels'>
                    {
                        channels.map((channel, idx) => (
                            <li
                                key={idx}
                                className='channel'
                                title={channel.name}
                                onClick={() => handleChannelClick(channel.name)}
                            >
                                {channel.name}
                            </li>
                        ))
                    }
                </ul>
            )}
        </div>
    )
};

export default ChannelList;