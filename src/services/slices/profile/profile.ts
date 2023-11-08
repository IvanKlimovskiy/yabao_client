import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileDataType } from "./profile.types.ts";
import { fetchCurrentUser } from "../../../utils/utils.tsx";
import { UserData } from "../users/users.types.ts";
import { getUsers } from "../users/users.ts";

export const getCurrentUser = createAsyncThunk<{
  status: "success" | "failure";
  user: UserData;
}>("user/fetchCurrentUser", async () => {
  const response = await fetchCurrentUser();
  if (!Array.isArray(response)) {
    return response;
  }
  throw new Error();
});

const initialState = {
  loading: false,
  profileRequest: false,
  profileFailed: false,
  accessToken: "",
  isAuthorized: false,
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
    setProfileData: (state, action: PayloadAction<ProfileDataType>) => {
      state.profileData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
      state.profileRequest = true;
    });
    builder.addCase(
      getCurrentUser.fulfilled,
      (
        state,
        action: PayloadAction<{
          status: "success" | "failure";
          user: UserData;
        }>,
      ) => {
        if (action.payload.status === "success") {
          const { name, img, number } = action.payload.user;
          state.profileData = {
            name,
            img,
            number,
          };
          state.loading = false;
          state.isAuthorized = true;
        } else {
          state.loading = false;
        }
      },
    );
    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false;
      state.profileFailed = true;
      state.profileRequest = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const { actions, reducer } = profile;
export const { setAccessToken, setIsAuthorized, setProfileData } = actions;
export default reducer;
