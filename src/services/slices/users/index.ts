import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsers } from "../../../utils";
import { jsonDataUsers, UsersState } from "./index.types.ts";

export const getUsers = createAsyncThunk<jsonDataUsers>(
  "users/fetchUsers",
  async () => {
    const response = await fetchUsers();
    if (!Array.isArray(response)) {
      return response;
    }
    throw new Error();
  },
);

const initialState: UsersState = {
  usersRequest: false,
  loading: false,
  usersFailed: false,
  users: [],
  error: undefined,
};

const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.usersRequest = true;
    });
    builder.addCase(
      getUsers.fulfilled,
      (state, action: PayloadAction<jsonDataUsers>) => {
        const { users } = action.payload.data;
        state.users = users.map((user) => user);
        state.loading = false;
      },
    );
    builder.addCase(getUsers.rejected, (state) => {
      state.loading = false;
      state.usersFailed = true;
      state.usersRequest = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const {reducer} = users;

export default reducer;
