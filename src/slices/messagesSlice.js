// @ts-check

import { createDraftSafeSelector, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { actions as channelActions, currentChannelSelector } from './channelsSlice.js';
import { setInitialState } from './appSlice.js';

const messagesAdapter = createEntityAdapter();

/* eslint-disable no-param-reassign */
export const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    newMessage: messagesAdapter.setOne,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialState.fulfilled, (state, action) => {
        const { messages } = action.payload;

        messagesAdapter.setAll(state, messages);
      })
      .addCase(channelActions.removeChannel, (state, action) => {
        const { id } = action.payload;
        const messagesIds = messagesAdapter.getSelectors()
          .selectAll(state)
          .filter(({ channelId }) => channelId !== id);

        messagesAdapter.setAll(state, messagesIds);
      });
  },
});

export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export const currentChannelMessagesSelector = createDraftSafeSelector(
  messagesSelectors.selectAll,
  currentChannelSelector,
  (messages, currentChannelId) => (
    messages.filter(({ channelId }) => channelId === currentChannelId)
  ),
);

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
