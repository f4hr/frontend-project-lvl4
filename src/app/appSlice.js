// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lang: 'ru',
  censorship: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeLanguage: (state, action) => ({
      ...state,
      lang: action.payload.lang,
    }),
    enableCensorship: (state) => ({
      ...state,
      censorship: true,
    }),
    disableCensorship: (state) => ({
      ...state,
      censorship: false,
    }),
  },
});

export const { changeLanguage } = appSlice.actions;
export default appSlice.reducer;
