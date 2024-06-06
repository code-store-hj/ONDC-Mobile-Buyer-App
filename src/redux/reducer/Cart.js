import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const Cart = createSlice({
  name: 'Cart',
  initialState: {
    cartItems: [],
  },
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const {setAddress} = Cart.actions;
export default Cart.reducer;
