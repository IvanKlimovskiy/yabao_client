import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchMenu } from "../../../utils/utils";
import { jsonData, MenuState } from "./menu.types";

export const getMenu = createAsyncThunk<jsonData[]>(
  "menu/fetchMenu",
  async () => {
    const response = await fetchMenu();
    if (Array.isArray(response)) {
      return response;
    }
    throw new Error();
  },
);

const initialState: MenuState = {
  menuRequest: false,
  loading: false,
  menuFailed: false,
  menu: [],
  error: undefined,
};

const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMenu.pending, (state) => {
      state.loading = true;
      state.menuRequest = true;
    });
    builder.addCase(
      getMenu.fulfilled,
      (state, action: PayloadAction<jsonData[]>) => {
        const fetchedData = action.payload;
        state.menu = fetchedData.map(({ data }) => data);
        state.loading = false;
      },
    );
    builder.addCase(getMenu.rejected, (state, action) => {
      state.loading = false;
      state.menuFailed = true;
      state.menuRequest = false;
      state.error = action.error.message;
    });
    builder.addDefaultCase(() => {});
  },
});

const { reducer } = menu;

export default reducer;
