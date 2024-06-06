import {configureStore} from '@reduxjs/toolkit';
import Auth from './reducer/Auth';
import Address from './reducer/Address';
import Cart from './reducer/Cart';
import Complaint from './reducer/Complaint';
import storeReducer from './reducer/storeReducer';
import orderReducer from './reducer/orderReducer';

export const store = configureStore({
  reducer: {
    Auth: Auth,
    Address:Address,
    Cart:Cart,
    Complaint:Complaint,
    storeReducer:storeReducer,
    orderReducer:orderReducer,
  },
});
