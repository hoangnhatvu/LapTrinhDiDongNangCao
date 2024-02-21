import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

const isLoginSlice = createSlice({
  name: 'isLogin',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLogin } = isLoginSlice.actions;

export default isLoginSlice.reducer;
