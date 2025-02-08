export interface Message {
    sender: string;
    content: string;
    timestamp: string;
}

export interface MessagesState {
    messages: Message[];
    loading: boolean;
}

export interface MessagesStateSlice {
    messages: MessagesState;
}