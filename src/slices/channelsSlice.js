// @ts-check

import { createEntityAdapter, createSlice, createDraftSafeSelector } from '@reduxjs/toolkit';
import constants from '../constants.js';
import { setInitialState } from './appSlice.js';

const initialState = {
  currentChannelId: null,
};
const channelsAdapter = createEntityAdapter();

/* eslint-disable no-param-reassign */
export const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(initialState),
  reducers: {
    newChannel: channelsAdapter.addOne,
    removeChannel: (state, action) => {
      const { id } = action.payload;

      channelsAdapter.removeOne(state, id);

      if (state.currentChannelId === id) state.currentChannelId = constants.DEFAULT_CHANNEL_ID;
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;

      channelsAdapter.updateOne(state, { id, changes: { name } });
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = Number(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialState.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;

        state.currentChannelId = currentChannelId;

        channelsAdapter.setAll(state, channels);
      });
  },
});

const selectSelf = (state) => state.channels;

export const channelsSelectors = channelsAdapter.getSelectors((state) => state.channels);
export const currentChannelSelector = createDraftSafeSelector(
  selectSelf,
  (state) => state.currentChannelId,
);
export const channelNamesSelector = createDraftSafeSelector(
  channelsSelectors.selectAll,
  (channels) => channels.map((channel) => channel.name),
);

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
