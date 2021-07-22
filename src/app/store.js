import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/chat/chatSlice.js';

export default configureStore({
  reducer: {
    chat: chatReducer,
  },
});
