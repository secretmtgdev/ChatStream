import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { User, UserState } from '../utils/interfaces';

const initialState: UserState = {
    user: null,
    isAuthenticated: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuthenticated = true;
        },
        logoutUser: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;