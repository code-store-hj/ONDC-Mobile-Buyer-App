import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const storeReducer = createSlice({
  name: 'orderReducer',
  initialState: {
    locations: [],
  },
  reducers: {
    setStoresList(state, action) {
      state.locations = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const {setStoresList} = storeReducer.actions;
export default storeReducer.reducer;
