export interface Message {
    channelName: string;
    sender: string;
    content: string;
    timestamp: string;
}

export interface MessagesState {
    messages: Message[];
    loading: boolean;
    error: any;
}

export interface MessagesStateSlice {
    messages: MessagesState;
}

export interface Channel {
    name: string;
    participants: User[];
}

export interface ChannelsState {
    selectedChannel: string;
    channels: Channel[];
    loading: boolean;
    error: any;
}

export interface ChannelsStateSlice {
    channels: ChannelsState;
}

export interface User {
    email: string;
    username: string;
    password: string;
    createdAt: string;
}

export interface UserState {
    user: User | null,
    isAuthenticated: boolean;
}

export interface UserStateSlice {
    user: UserState
}