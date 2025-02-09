export const SERVER_URL: string = 'http://localhost:5000';
export const API_MAP = {
    messages: {
        root: 'messages'
    },
    channels: {
        root: 'channels'
    },
    authentication: {
        root: 'auth',
        login: 'auth/login',
        signup: 'auth/signup',
        currentUser: 'auth/me'
    }
};