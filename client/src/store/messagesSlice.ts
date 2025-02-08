import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { Message, MessagesState } from '../utils/interfaces';

const initialState: MessagesState = {
    messages: [],
    loading: false
}

export const fetchMessages = createAsyncThunk<Message[]>('messages/fetchMessages', async() => {
    const response = await axios.get('http://localhost:5000/api/messages');
    return response.data;
});

export const sendMessage = createAsyncThunk<Message, Message>('messages/sendMessage', async(newMessage: Message) => {
    const response = await axios.post('http://localhost:5000/api/messages', newMessage);
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
        })
        .addCase(fetchMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
            state.loading = false;
        })
        .addCase(fetchMessages.rejected, (state) => {
            state.loading = false;
        })
        .addCase(sendMessage.pending, (state) => {
            state.loading = true;
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload);
            state.loading = false;
        })
        .addCase(sendMessage.rejected, (state) => {
            state.loading = false;
        })
    }

});

export default messagesSlice.reducer;