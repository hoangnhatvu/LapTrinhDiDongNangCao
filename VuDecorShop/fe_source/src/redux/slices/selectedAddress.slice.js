import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

const selectedAddressSlice = createSlice({
  name: 'selectedAddress',
  initialState,
  reducers: {
    setSelectedAddress: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setSelectedAddress} = selectedAddressSlice.actions;

export default selectedAddressSlice.reducer;
