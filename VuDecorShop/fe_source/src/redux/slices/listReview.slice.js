import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const listReviewSlice = createSlice({
  name: 'listReview',
  initialState,
  reducers: {
    setListReview: (state) => {
      state.value = [];
    },
    addReivew: (state, action) => {
      state.value.push(action.payload);
    },
    removeReivew: (state, action) => {
      if (state.value)
        state.value = state.value.filter(item => item.id !== action.payload.id);
    },
    updateReivew: (state, action) => {
      existingItemIndex = state.value.findIndex(
        item => item.product === action.payload.product,
      );
      if (existingItemIndex !== -1)
        state.value[existingItemIndex].rate = action.payload.rate;
        state.value[existingItemIndex].content = action.payload.content;
    },
  },
});

export const {setListReview, addReivew, removeReivew, updateReivew} =
  listReviewSlice.actions;

export default listReviewSlice.reducer;
