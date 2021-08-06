// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import socketMiddleware from '../middlewares/socketMiddleware.js';
import appReducer from './appSlice.js';
import channelsReducer from '../components/chat/channelsSlice.js';
import messagesReducer from '../components/chat/messagesSlice.js';
import modalsReducer from '../components/modals/modalsSlice.js';

export default (socketClient) => configureStore({
  reducer: {
    app: appReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(socketMiddleware(socketClient)),
});
