import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setFiles: (state, action) => {
      return [...state, action.payload];
    },
    removeFiles: () => {
      return [];
    },
    updateContentByPath: (state, action) => {
      const { path, description, content } = action.payload;
      return state.map((file) =>
        file.path === path ? { ...file, description, content } : file
      );
    },
  },
});

export const { setFiles, removeFiles, updateContentByPath } =
  resultSlice.actions;
export const ResultReducer = resultSlice.reducer;
