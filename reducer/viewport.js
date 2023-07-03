import { createSlice } from "@reduxjs/toolkit";

export const viewportSlice = createSlice({
  name: "viewport",
  initialState: {
    value: 0,
    width: 0,
    height: 0,
    locale: "zh_TW",
    menu: false,
  },
  reducers: {
    setPosition: (state, action) => {
      state.value = action.payload;
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setLocale: (state, action) => {
      state.locale = action.payload;
    },
    toggleLocale: (state) => {
      state.locale = state.locale === "en" ? "zh_TW" : "en";
    },
    toggleMenu: (state) => {
      state.menu = !state.menu;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setPosition,
  setWidth,
  setHeight,
  setLocale,
  toggleLocale,
  toggleMenu,
} = viewportSlice.actions;

export default viewportSlice.reducer;
