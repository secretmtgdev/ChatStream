import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';

import { setUser } from './store/userSlice';
import MessageThread from './components/message-thread/MessageThread';
import CreateChannel from './components/create-channel/CreateChannel';
import ChannelList from './components/channels-list/ChannelsList';
import Navbar from './components/navbar/Navbar';

import './App.css';
import { API_MAP, SERVER_URL } from './utils/constants';

function App() {
  const dispatch = useDispatch();
  const selectedChannel = useSelector((state) => state.channels.selectedChannel);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${SERVER_URL}/api/${API_MAP.authentication.currentUser}`, {
            headesr: { Authorization: `Bearer ${token}` }
          });
          dispatch(setUser(response.data.user));
        } catch (error) {
          console.error('User is not in the system.');
          localStorage.removeItem('token');
        }
      }
    }

    fetchUser();
  }, [dispatch]);
  
  return (
    <div id="app" className='flex flex-col'>
      <Navbar />
      <div className='content flex flex-row'>
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
    </div>
  );
}

export default App;
