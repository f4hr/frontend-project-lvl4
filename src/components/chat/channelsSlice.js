// @ts-check

import { keyBy, omit, findKey } from 'lodash';
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

export const addNewChannelActions = {
  request: 'newChannel',
  success: 'addNewChannelSuccess',
  failure: 'addNewChannelFailure',
};
export const removeChannelActions = {
  request: 'removeChannel',
  success: 'removeChannelSuccess',
  failure: 'removeChannelFailure',
};
export const renameChannelActions = {
  request: 'renameChannel',
  success: 'renameChannelSuccess',
  failure: 'renameChannelFailure',
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
    newChannel: (state, action) => {
      const { id } = action.payload;
      state.allIds.push(id);
      state.byId[id] = action.payload;
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      const { byId, allIds } = state;
      state.allIds = allIds.filter((channelId) => channelId !== id);
      state.byId = omit(byId, id);
      if (state.currentChannelId === id) {
        state.currentChannelId = Number(findKey(byId, ['name', 'general']));
      }
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      state.byId[id].name = name;
    },
    addNewChannel: {
      reducer: (state) => {
        state.status = 'pending';
      },
      prepare: (channelName) => ({
        payload: {
          type: 'socket',
          scope: 'channels',
          actions: addNewChannelActions,
          body: channelName,
        },
      }),
    },
    [addNewChannelActions.success]: (state, action) => {
      state.currentChannelId = action.payload.data.id;
      state.status = 'succeeded';
    },
    [addNewChannelActions.failure]: (state) => {
      state.status = 'failed';
      state.error = 'Add new channel failed';
    },
    removeChannelRequest: {
      reducer: (state) => {
        state.status = 'pending';
      },
      prepare: (channelId) => ({
        payload: {
          type: 'socket',
          scope: 'channels',
          actions: removeChannelActions,
          body: { id: Number(channelId) },
        },
      }),
    },
    [removeChannelActions.success]: (state) => {
      state.status = 'succeeded';
    },
    [removeChannelActions.failure]: (state) => {
      state.status = 'failed';
      state.error = 'Remove channel failed';
    },
    renameChannelRequest: {
      reducer: (state) => {
        state.status = 'pending';
      },
      prepare: ({ id, name }) => ({
        payload: {
          type: 'socket',
          scope: 'channels',
          actions: renameChannelActions,
          body: { id, name },
        },
      }),
    },
    [renameChannelActions.success]: (state) => {
      state.status = 'succeeded';
    },
    [renameChannelActions.failure]: (state) => {
      state.status = 'failed';
      state.error = 'Remove channel failed';
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

export const serverActions = [
  'newChannel',
  'removeChannel',
  'renameChannel',
];
export const { actions } = channelsSlice;
export const {
  addNewChannel,
  removeChannelRequest,
  renameChannelRequest,
  setCurrentChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
