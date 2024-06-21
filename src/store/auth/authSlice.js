// /src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', // 'authenticated','not-authenticated'
        user: {},
        errorMessage: undefined,
    },
    reducers: {
        startChecking: (state) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        loginSuccess: (state, { payload }) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        logout: (state, { payload }) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearError: (state) => {
            state.errorMessage = undefined;
        }
    }
});

// Action creators are generated for each case reducer function
export const { startChecking: onChecking, loginSuccess: onLogin, logout: onLogout, clearError: clearErrorMessage } = authSlice.actions;
