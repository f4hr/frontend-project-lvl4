// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  type: null,
  isOpened: false,
  meta: null,
};

/* eslint-disable no-param-reassign */
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
});

export const { openModal, closeModal } = modalsSlice.actions;
export const { actions } = modalsSlice;

export default modalsSlice.reducer;
