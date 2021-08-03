// @ts-check

import { keys, keyBy, pickBy } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { setInitialState, removeChannelActions } from './channelsSlice.js';

const initialState = {
  byId: {},
  allIds: [],
  status: 'idle',
  error: null,
};

const sendMessageActions = {
  request: 'newMessage',
  success: 'sendMessageSuccess',
  failure: 'sendMessageFailure',
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage: (state, action) => {
      const {
        id,
        channelId,
        username,
        body,
      } = action.payload;

      state.allIds.push(id);
      state.byId[id] = {
        id,
        channelId,
        username,
        body,
      };
    },
    sendMessage: {
      reducer: (state) => {
        state.status = 'pending';
      },
      prepare: (message) => ({
        payload: {
          type: 'socket',
          scope: 'messages',
          actions: sendMessageActions,
          body: message,
        },
      }),
    },
    [sendMessageActions.success]: (state) => {
      state.status = 'succeeded';
    },
    [sendMessageActions.failure]: (state) => {
      state.status = 'failed';
      state.error = 'Message send failed';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialState.fulfilled, (state, action) => {
        const { messages } = action.payload;
        state.allIds = messages.map(({ id }) => id);
        state.byId = keyBy(messages, 'id');
      })
      .addCase(`channels/${removeChannelActions.request}`, (state, action) => {
        const { id } = action.payload;
        const { byId } = state;
        state.byId = pickBy(byId, ({ channelId }) => channelId !== id);
        state.allIds = keys(state.byId).map((key) => Number(key));
      });
  },
});

export const serverActions = [
  'newMessage',
];

export const { actions } = messagesSlice;
export const { sendMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
