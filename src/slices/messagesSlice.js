// @ts-check

import _ from 'lodash';
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

/* eslint-disable no-param-reassign */
export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    newMessage: (state, action) => {
      const { allIds } = state;
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

      state.allIds = _.union(allIds, [id]);
      state.byId[id] = newMessage;
    },
    sendMessage: (state) => {
      state.status = 'pending';
    },
    [sendMessageActions.success]: (state) => {
      state.status = 'succeeded';
    },
    [sendMessageActions.failure]: (state) => {
      state.status = 'failed';
      state.error = { message: 'messages.errors.send' };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialState.fulfilled, (state, action) => {
        const { messages } = action.payload;

        state.allIds = messages.map(({ id }) => id);
        state.byId = _.keyBy(messages, 'id');
      })
      .addCase(`channels/${removeChannelActions.request}`, (state, action) => {
        const { id } = action.payload;
        const filteredById = _.pickBy(state.byId, ({ channelId }) => channelId !== id);

        state.allIds = _.keys(filteredById).map((key) => Number(key));
        state.byId = filteredById;
      });
  },
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
