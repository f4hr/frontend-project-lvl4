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
      const { allIds, byId } = state;
      const {
        id,
        channelId,
        username,
        body,
      } = action.payload;
      const newMessage = {
        id,
        channelId,
        username,
        body,
      };
      return {
        ...state,
        allIds: [...allIds, id],
        byId: { ...byId, [id]: newMessage },
      };
    },
    sendMessage: {
      reducer: (state) => ({
        ...state,
        status: 'pending',
      }),
      prepare: (message) => ({
        payload: {
          type: 'socket',
          scope: 'messages',
          actions: sendMessageActions,
          body: message,
        },
      }),
    },
    [sendMessageActions.success]: (state) => ({
      ...state,
      status: 'succeeded',
    }),
    [sendMessageActions.failure]: (state) => ({
      ...state,
      status: 'failed',
      error: 'Message send failed',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialState.fulfilled, (state, action) => {
        const { messages } = action.payload;
        return {
          ...state,
          allIds: messages.map(({ id }) => id),
          byId: keyBy(messages, 'id'),
        };
      })
      .addCase(`channels/${removeChannelActions.request}`, (state, action) => {
        const { id } = action.payload;
        const { byId } = state;
        return {
          ...state,
          allIds: keys(byId).map((key) => Number(key)),
          byId: pickBy(byId, ({ channelId }) => channelId !== id),
        };
      });
  },
});

export const serverActions = [
  'newMessage',
];

export const { actions } = messagesSlice;
export const { sendMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
