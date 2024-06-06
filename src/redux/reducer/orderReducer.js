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
  },
  extraReducers: builder => {},
});

export const {setOrderDetails} = orderReducer.actions;
export default orderReducer.reducer;
