import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  isAuthorized: false,
};

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setIsAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
  },
});

const { actions, reducer } = profile;
export const { setAccessToken, setIsAuthorized } = actions;
export default reducer;
