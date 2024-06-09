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
    setClearCart(state) {
      state.cartItems = [];
    },
    setclearAllData(state) {
      state.cartItems = [];
    },
  },
  extraReducers: builder => {},
});

export const {setCartItems, setClearCart, setclearAllData} = Cart.actions;
export default Cart.reducer;
