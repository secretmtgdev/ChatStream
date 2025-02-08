import React from 'react';
import { useSelector } from "react-redux";

import MessageThread from './components/message-thread/MessageThread';
import CreateChannel from './components/create-channel/CreateChannel';

import './App.css';
import ChannelList from './components/channels-list/ChannelsList';

function App() {
  const selectedChannel = useSelector((state) => state.channels.selectedChannel);
  return (
    <div className="app">
      <div id='left-panel'>
        <ChannelList />
      </div>
      <div id='main-content'>
        <CreateChannel />
        {
          !selectedChannel.trim() ?
            (
              <p>A channel must be selected or created...</p>
            ) : 
            (
              <MessageThread />
            )
        }
      </div>
    </div>
  );
}

export default App;
