// @ts-check

import { keyBy, omit, findKey } from 'lodash';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

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

  return null;
};

export const setInitialState = createAsyncThunk(
  'channels/setInitialState',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.apiInitialStatePath(), {
        headers: getAuthHeader(),
      });

      return response.data;
    } catch (err) {
      if (err.isAxiosError) {
        const type = err.response.status === 401 ? 'auth' : 'network';
        const message = err.response.status === 401 ? 'errors.auth' : 'errors.network';

        return rejectWithValue({ type, message });
      }

      console.error(err.response.statusText);

      return rejectWithValue({ type: 'unknown', message: 'errors.unknown' });
    }
  },
);

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
      const currentChannelId = (state.currentChannelId === id)
        ? Number(findKey(byId, ['name', 'general']))
        : state.currentChannelId;

      state.allIds = allIds.filter((channelId) => channelId !== id);
      state.byId = omit(byId, id);
      state.currentChannelId = currentChannelId;
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;

      state.byId[id].name = name;
    },
    addNewChannel: (state) => {
      state.status = 'pending';
    },
    addNewChannelSuccess: (state, action) => {
      state.currentChannelId = action.payload.id;
      state.status = 'succeeded';
    },
    addNewChannelFailure: (state) => {
      state.status = 'failed';
      state.error = { message: 'channels.errors.new' };
    },
    removeChannelRequest: (state) => {
      state.status = 'pending';
    },
    removeChannelSuccess: (state) => {
      state.status = 'succeeded';
    },
    removeChannelFailure: (state) => {
      state.status = 'failed';
      state.error = { message: 'channels.errors.remove' };
    },
    renameChannelRequest: (state) => {
      state.status = 'pending';
    },
    renameChannelSuccess: (state) => {
      state.status = 'succeeded';
    },
    renameChannelFailure: (state) => {
      state.status = 'failed';
      state.error = { message: 'channels.errors.rename' };
    },
    setCurrentChannel: (state, action) => {
      state.currentChannelId = Number(action.payload);
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
        state.error = action.payload;
      });
  },
});

export const { setCurrentChannel } = channelsSlice.actions;
export const { actions } = channelsSlice;

export default channelsSlice.reducer;
