import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlices'; // Reducer untuk autentikasi

const store = configureStore({
    reducer: {
        auth: authReducer, // Menambahkan slice autentikasi
    },
});

export default store;
