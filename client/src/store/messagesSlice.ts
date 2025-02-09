import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { Message, MessagesState } from '../utils/interfaces';
import { API_MAP, SERVER_URL } from '../utils/constants';

const initialState: MessagesState = {
    messages: [],
    loading: false,
    error: null
}

export const fetchMessages = createAsyncThunk<Message[]>('messages/fetchMessages', async() => {
    const response = await axios.get(`${SERVER_URL}/api/${API_MAP.messages.root}`);
    return response.data;
});

export const fetchByChannel = createAsyncThunk<Message[], string>('messages/fetchByChannel', async(channelName: string) => {
    const response = await axios.get(`${SERVER_URL}/api/${API_MAP.messages.root}/${channelName}`);
    return response.data;
});

export const sendMessage = createAsyncThunk<Message, Message>('messages/sendMessage', async(newMessage: Message) => {
    const response = await axios.post(`${SERVER_URL}/api/${API_MAP.messages.root}`, newMessage);
    return response.data;
});

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    // handle async thunk logic
    extraReducers: (builder) => {
        builder
        .addCase(fetchMessages.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
            state.loading = false;
        })
        .addCase(fetchMessages.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(fetchByChannel.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchByChannel.fulfilled, (state, action: PayloadAction<Message[]>) => {
            state.messages = action.payload;
            state.loading = false;
        })
        .addCase(fetchByChannel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(sendMessage.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
            state.loading = false;
        })
        .addCase(sendMessage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }

});

export default messagesSlice.reducer;