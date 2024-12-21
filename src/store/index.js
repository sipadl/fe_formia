import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices'; // Reducer untuk autentikasi
import apiReducer from './slices/apiSlices';

const store = configureStore({
    reducer: {
        auth: authReducer, // Menambahkan slice autentikasi
        api: apiReducer,
    },
});

export default store;
