import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false, // Status login
    user: null,             // Informasi pengguna
    detail: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        detail: (state, action) => {
            state.detail = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.detail = null;
        },
    },
});

export const { login, logout, detail } = authSlice.actions;
export default authSlice.reducer;
