// @ts-check

import { createSlice } from '@reduxjs/toolkit';
import {
  addNewChannelActions,
  renameChannelActions,
  removeChannelActions,
} from './channelsSlice.js';

const initialState = {
  type: null,
  isOpened: false,
  meta: null,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload.type;
      state.meta = action.payload.meta ?? null;
      state.isOpened = true;
    },
    closeModal: (state) => {
      state.isOpened = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(`channels/${addNewChannelActions.success}`, (state) => {
        state.isOpened = false;
      })
      .addCase(`channels/${renameChannelActions.success}`, (state) => {
        state.isOpened = false;
      })
      .addCase(`channels/${removeChannelActions.success}`, (state) => {
        state.isOpened = false;
      });
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export const { actions } = modalsSlice;

export default modalsSlice.reducer;
