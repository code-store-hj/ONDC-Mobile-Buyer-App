import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const orderReducer = createSlice({
  name: 'orderReducer',
  initialState: {
    orderDetails: null,
    requestingStatus: false,
    requestingTracker: false,
  },
  reducers: {
    setOrderDetails(state, action) {
      state.orderDetails = action.payload;
    },
    setUpdateRequestingStatus(state, action) {
      state.requestingStatus = action.payload;
    },
    setUpdateRequestingTracker(state, action) {
      state.requestingTracker = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const {
  setOrderDetails,
  setUpdateRequestingStatus,
  setUpdateRequestingTracker,
} = orderReducer.actions;
export default orderReducer.reducer;
