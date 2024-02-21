import {configureStore} from '@reduxjs/toolkit';
import isCheckAllReducer from './slices/isCheckAll.slice';
import listOrderItemReducer from './slices/listOrderItem.slice';
import userInfoReducer from './slices/userInfo.slice';
import optionProductReducer from './slices/optionProduct.slice';
import isLoginReducer from './slices/isLogin.slice';
import selectedAddressReducer from './slices/selectedAddress.slice';
import listReviewReducer from './slices/listReview.slice'

const store = configureStore({
  reducer: {
    isCheckAll: isCheckAllReducer,
    listOrderItem: listOrderItemReducer,
    userInfo: userInfoReducer,
    optionProduct: optionProductReducer,
    isLogin: isLoginReducer,
    selectedAddress: selectedAddressReducer,
    listReview: listReviewReducer,
  },
});

export default store;
