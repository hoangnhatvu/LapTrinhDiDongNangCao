import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

const isCheckAllSlice = createSlice({
  name: 'isCheckAll',
  initialState,
  reducers: {
    setIsCheckAll: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsCheckAll } = isCheckAllSlice.actions;

export default isCheckAllSlice.reducer;
