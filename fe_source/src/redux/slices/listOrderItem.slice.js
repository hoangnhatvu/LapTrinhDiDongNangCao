import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const listOrderItemSlice = createSlice({
  name: 'listOrderItem',
  initialState,
  reducers: {
    setListOrderItem: (state) => {
      state.value = [];
    },
    addOrderItem: (state, action) => {
      state.value.push(action.payload);
    },
    removeOrderItem: (state, action) => {
      if (state.value)
        state.value = state.value.filter(item => item.id !== action.payload.id);
    },
    updateOrderItem: (state, action) => {
      existingItemIndex = state.value.findIndex(
        item => item.id === action.payload.id,
      );
      if (existingItemIndex !== -1)
        state.value[existingItemIndex].quantity = action.payload.quantity;
    },
  },
});

export const {setListOrderItem, addOrderItem, removeOrderItem, updateOrderItem} =
  listOrderItemSlice.actions;

export default listOrderItemSlice.reducer;
