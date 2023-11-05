import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  isAuthorized: true,
  profileData: {
    name: "",
    img: "",
    number: "",
  },
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
    setProfileData: (
      state,
      action: PayloadAction<{ name: string; img: string; number: string }>,
    ) => {
      state.profileData = action.payload;
    },
  },
});

const { actions, reducer } = profile;
export const { setAccessToken, setIsAuthorized, setProfileData } = actions;
export default reducer;
