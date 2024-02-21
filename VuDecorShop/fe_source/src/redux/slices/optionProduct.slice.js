import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

const optionProductSlice = createSlice({
  name: 'optionProduct',
  initialState,
  reducers: {
    setOptionProduct: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setOptionProduct } = optionProductSlice.actions;

export default optionProductSlice.reducer;
