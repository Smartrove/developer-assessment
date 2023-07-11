import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    storeUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { storeUsers } = userSlice.actions;

export default userSlice.reducer;
