// @ts-check

import { createSlice } from '@reduxjs/toolkit';
import { addNewChannelActions } from '../chat/channelsSlice.js';

const initialState = {
  type: null,
  isOpened: false,
};

const modals = {
  newChannelModal: () => 'newChannelModal',
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.type = action.payload;
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
      });
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
export const { newChannelModal } = modals;
export default modalsSlice.reducer;
