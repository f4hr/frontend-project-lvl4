// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lang: 'ru',
};

/* eslint-disable no-param-reassign */
export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeLanguage: (state, action) => {
      state.lang = action.payload.lang;
    },
  },
});

export const { changeLanguage } = appSlice.actions;
export const { actions } = appSlice;

export default appSlice.reducer;
