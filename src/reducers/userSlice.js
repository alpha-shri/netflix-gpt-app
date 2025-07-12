import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (_state, action) => {
      console.log("addUser called: ", action.payload);
      return action.payload;
    },
    removeUser: () => {
      console.log("removeUser called..");
      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
