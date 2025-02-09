import { configureStore } from '@reduxjs/toolkit';
import messagesReducer from './messagesSlice';
import channelsReducer from './channelSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer: {
        messages: messagesReducer,
        channels: channelsReducer,
        user: userSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;