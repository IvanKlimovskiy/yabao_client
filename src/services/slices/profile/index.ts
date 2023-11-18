import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileDataType } from './index.types.ts';
import { fetchCurrentUser } from '../../../utils';
import { UserData } from '../users/index.types.ts';
import { getUsers } from '../users';

export const getCurrentUser = createAsyncThunk<{
  status: 'success' | 'failure';
  user: UserData;
}>('user/fetchCurrentUser', async () => {
  const response = await fetchCurrentUser();
  if (!Array.isArray(response)) {
    return response;
  }
  throw new Error();
});

const initialState = {
  isLoading: false,
  profileRequest: false,
  profileFailed: false,
  accessToken: '',
  isLoggingOut: false,
  isAuthorized: false,
  profileData: {
    _id: '',
    name: '',
    img: '',
    number: '',
    email: '',
    birthdate: '',
    isActivated: false,
    isSubscribed: true,
  },
};

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setIsAuthorized: (state, action: PayloadAction<boolean>) => {
      state.isAuthorized = action.payload;
    },
    setProfileData: (state, action: PayloadAction<ProfileDataType>) => {
      state.isLoading = true;
      state.profileData = action.payload;
      state.isLoading = false;
    },
    toggleSubscribe: (state) => {
      state.profileData.isSubscribed = !state.profileData.isSubscribed;
    },
    setIsLoggingOut: (state, action: PayloadAction<boolean>) => {
      state.isLoggingOut = action.payload;
      state.accessToken = '';
      state.profileData = {
        _id: '',
        name: '',
        img: '',
        number: '',
        email: '',
        birthdate: '',
        isActivated: false,
        isSubscribed: true,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
      state.profileRequest = true;
    });
    builder.addCase(
      getCurrentUser.fulfilled,
      (
        state,
        action: PayloadAction<{
          status: 'success' | 'failure';
          user: UserData;
        }>
      ) => {
        if (action.payload.status === 'success') {
          state.profileData = {
            ...action.payload.user,
          };
          state.isLoading = false;
          state.isAuthorized = true;
        } else {
          state.isLoading = false;
        }
      }
    );
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = false;
      state.profileFailed = true;
      state.profileRequest = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const { actions, reducer } = profile;
export const { setAccessToken, setIsAuthorized, setProfileData, setIsLoggingOut, setIsLoading, toggleSubscribe } = actions;
export default reducer;
