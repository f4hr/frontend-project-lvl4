// @ts-check

import { keyBy } from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes.js';

const initialState = {
  byId: {},
  allIds: [],
  currentChannelId: null,
  status: 'idle',
  error: null,
};

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export const setInitialState = createAsyncThunk('channels/setInitialState', async () => {
  const response = await axios.get(routes.initialStatePath(), {
    headers: getAuthHeader(),
  });

  return response.data;
});

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      console.log(action.payload);
    },
    setCurrentChannel: (state, action) => {
      const channelId = parseInt(action.payload, 10);
      state.currentChannelId = channelId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialState.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setInitialState.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        state.currentChannelId = currentChannelId;
        state.allIds = channels.map(({ id }) => id);
        state.byId = keyBy(channels, 'id');
        state.status = 'succeeded';
      })
      .addCase(setInitialState.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addChannel, setCurrentChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
