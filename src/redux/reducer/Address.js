import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const Address = createSlice({
  name: 'Address',
  initialState: {
    address: null,
  },
  reducers: {
    setAddress(state, action) {
      state.address = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const {setAddress} = Address.actions;
export default Address.reducer;
