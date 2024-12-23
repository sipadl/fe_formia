import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
  loading: false,
  error: null,
  message: '',
};

const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    apiRequestStart: (state) => {
      state.loading = true;
    },
    apiRequestSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.message = action.payload;
    },
    apiRequestFailure: (state, action) => {
        console.log(action.payload)
      state.loading = false;
      state.message = action.payload;
    },
  },
});

export const { apiRequestStart, apiRequestSuccess, apiRequestFailure } = apiSlice.actions;
export default apiSlice.reducer;
