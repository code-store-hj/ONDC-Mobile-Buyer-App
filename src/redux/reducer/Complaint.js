import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const Complaint = createSlice({
  name: 'Complaint',
  initialState: {
    complaintDetails: null,
  },
  reducers: {
    setComplaint(state, action) {
      state.complaintDetails = action.payload;
    },
  },
  extraReducers: builder => {},
});

export const {setComplaint} = Complaint.actions;
export default Complaint.reducer;
