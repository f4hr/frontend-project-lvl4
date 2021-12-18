// @ts-check

import { createSlice, createAsyncThunk, createDraftSafeSelector } from '@reduxjs/toolkit';
import axios from 'axios';
import constants from '../constants.js';
import routes from '../routes.js';
import storage from '../utils/storage.js';

const initialState = {
  lang: constants.LANG,
};

const getAuthHeader = () => {
  const userId = storage.getUser();

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return null;
};

export const setInitialState = createAsyncThunk(
  'app/setInitialState',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.apiInitialStatePath(), {
        headers: getAuthHeader(),
      });

      return response.data;
    } catch (err) {
      if (err.isAxiosError) {
        const message = err.response.status === 401 ? 'errors.auth' : 'errors.network';

        return rejectWithValue({ message });
      }

      console.error(err.response.statusText);

      return rejectWithValue({ message: 'errors.server' });
    }
  },
);

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

const selectSelf = (state) => state.app;

export const currentLanguageSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.lang,
);

export const { changeLanguage } = appSlice.actions;
export const { actions } = appSlice;

export default appSlice.reducer;
