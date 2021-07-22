import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../../routes.js';

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: null,
  users: [],
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

export const fetchChat = createAsyncThunk('chat/fetchChat', async () => {
  const response = await axios.get(routes.chatPath(), {
    headers: getAuthHeader(),
  });

  return response.data;
});

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  extraReducers: {
    [fetchChat.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchChat.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      // Add any fetched posts to the array
      const { channels, messages, currentChannelId } = action.payload;
      state.channels = channels;
      state.messages = messages;
      state.currentChannelId = currentChannelId;
    },
    [fetchChat.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default chatSlice.reducer;
