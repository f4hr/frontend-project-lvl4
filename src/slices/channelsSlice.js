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

// FIXME return value
const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

export const setInitialState = createAsyncThunk(
  'channels/setInitialState',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get(routes.initialStatePath(), {
        headers: getAuthHeader(),
      });

      return response.data;
    } catch (err) {
      if (err.isAxiosError) {
        const message = err.response.status === 401 ? 'errors.auth' : 'errors.network';

        return rejectWithValue({ message });
      }

      console.error(err.response.statusText);

      return rejectWithValue({ message: 'errors.unknown' });
    }
  },
);

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    newChannel: (state, action) => {
      const { byId, allIds } = state;
      const { id } = action.payload;
      return {
        ...state,
        allIds: [...allIds, id],
        byId: { ...byId, [id]: action.payload },
      };
    },
    removeChannel: (state, action) => {
      const { id } = action.payload;
      const { byId, allIds } = state;
      const currentChannelId = (state.currentChannelId === id)
        ? Number(findKey(byId, ['name', 'general']))
        : state.currentChannelId;
      return {
        ...state,
        allIds: allIds.filter((channelId) => channelId !== id),
        byId: omit(byId, id),
        currentChannelId,
      };
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload;
      const channel = state.byId[id];
      return {
        ...state,
        byId: { ...state.byId, [id]: { ...channel, name } },
      };
    },
    addNewChannel: {
      reducer: (state) => ({
        ...state,
        status: 'pending',
      }),
      prepare: (channelName) => ({
        payload: {
          type: 'socket',
          scope: 'channels',
          actions: addNewChannelActions,
          body: channelName,
        },
      }),
    },
    [addNewChannelActions.success]: (state, action) => ({
      ...state,
      currentChannelId: action.payload.data.id,
      status: 'succeeded',
    }),
    [addNewChannelActions.failure]: (state) => ({
      ...state,
      status: 'failed',
      error: 'Add new channel failed',
    }),
    removeChannelRequest: {
      reducer: (state) => ({
        ...state,
        status: 'pending',
      }),
      prepare: (channelId) => ({
        payload: {
          type: 'socket',
          scope: 'channels',
          actions: removeChannelActions,
          body: { id: Number(channelId) },
        },
      }),
    },
    [removeChannelActions.success]: (state) => ({
      ...state,
      status: 'succeeded',
    }),
    [removeChannelActions.failure]: (state) => ({
      ...state,
      status: 'failed',
      error: 'Remove channel failed',
    }),
    renameChannelRequest: {
      reducer: (state) => ({
        ...state,
        status: 'pending',
      }),
      prepare: ({ id, name }) => ({
        payload: {
          type: 'socket',
          scope: 'channels',
          actions: renameChannelActions,
          body: { id, name },
        },
      }),
    },
    [renameChannelActions.success]: (state) => ({
      ...state,
      status: 'succeeded',
    }),
    [renameChannelActions.failure]: (state) => ({
      ...state,
      status: 'failed',
      error: 'Remove channel failed',
    }),
    setCurrentChannel: (state, action) => {
      const channelId = Number(action.payload);
      return {
        ...state,
        currentChannelId: channelId,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialState.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(setInitialState.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        return {
          ...state,
          currentChannelId,
          allIds: channels.map(({ id }) => id),
          byId: keyBy(channels, 'id'),
          status: 'succeeded',
        };
      })
      .addCase(setInitialState.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.payload.message,
      }));
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
