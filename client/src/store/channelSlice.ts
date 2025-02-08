import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Channel, ChannelsState } from "../utils/interfaces";
import axios from "axios";
import { API_MAP, SERVER_URL } from "../utils/constants";

const initialState: ChannelsState = {
    selectedChannel: '',
    channels: [],
    loading: false,
    error: null
}

export const fetchChannels = createAsyncThunk<Channel[]>('channel/fetchChannels', async () => {
    const response = await axios.get(`${SERVER_URL}/api/${API_MAP.channels.root}`);
    return response.data;
})

export const createChannel = createAsyncThunk<Channel, Channel>('channel/createChannel', async (newChannel: Channel) => {
    const response = await axios.post(`${SERVER_URL}/api/${API_MAP.channels.root}`, newChannel);
    return response.data;
});

const channelSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        setSelectedChannel: (state, action) => {
            state.selectedChannel = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchChannels.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchChannels.fulfilled, (state, action) => {
            state.channels = action.payload
            state.loading = false;
        })
        .addCase(fetchChannels.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(createChannel.pending, (state) => {
            state.loading = true;
        })
        .addCase(createChannel.fulfilled, (state, action) => {
            state.channels.push(action.payload);
            state.loading = false;
        })
        .addCase(createChannel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export const { setSelectedChannel } = channelSlice.actions;

export default channelSlice.reducer;