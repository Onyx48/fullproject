import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.status = true;

      state.useData = action.payload.userData;
      console.log("Redux login reducer executed.New state", state);
    },

    logout: (state) => {
      state.status = false;
      state.userData = null;
      console.log("redux logout reducer executed.New state:", state);
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
