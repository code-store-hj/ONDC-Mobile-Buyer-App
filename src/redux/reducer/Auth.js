import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearAll, getStoredData, setStoredData} from '../../utils/storage';
// import {PastToursAPI} from '../apis';

const Auth = createSlice({
  name: 'Auth',
  initialState: {
    token: null,
    uid: null,
    emailId: null,
    name: null,
    photoURL: null,
    language: 'en',
  },
  reducers: {
    setLoginDetails(state, action) {
      state.token = action.payload.token;
      state.emailId = action.payload.emailId;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.photoURL = action.payload.photoURL;
      state.transaction_id = action.payload.transaction_id;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setTractionId(state, action) {
      state.transaction_id = action.payload;
    },
    setLanguage(state, action) {
      state.language = action.payload;
    },
    setLogoutUser(state) {
      clearAll().then(() => {
        state = Object.assign({}, state, initialState);
      });
    },
    setSaveUser(state, action) {
      state.token = action.payload.token;
      state.emailId = action.payload.emailId;
      state.uid = action.payload.uid;
      state.name = action.payload.name;
      state.photoURL = action.payload.photoURL;
      state.transaction_id = action.payload.transaction_id;
    },
  },
  extraReducers: builder => {
    // builder.addCase(PastToursAPI.pending, state => {
    //   console.log('pending :: ');
    //   state.loader = true;
    // });
    // builder.addCase(PastToursAPI.fulfilled, (state, action) => {
    //   // console.log('ction.payload :: ',JSON.stringify(action.payload))
    //   if(action.payload.rows.length > 0){
    //     if (state.response !== null) {
    //       state.response.rows = [...state.response.rows, ...action.payload.rows];
    //     } else {
    //       state.response = action.payload;
    //     }
    //     state.loader = false;
    //     state.isLoadMore = false;
    //     state.refreshing = false;
    //   }else{
    //     state.isLoadMore = null;
    //   }
    // });
    // builder.addCase(PastToursAPI.rejected, state => {
    //   console.log('reject :: ');
    //   state.loader = false;
    //   state.isLoadMore = false;
    //   state.refreshing = false;
    // });
  },
});

export const {
  setLoginDetails,
  setToken,
  setTractionId,
  setLanguage,
  setLogoutUser,
  setSaveUser,
} = Auth.actions;
export default Auth.reducer;
