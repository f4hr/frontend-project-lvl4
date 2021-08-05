// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import socketMiddleware from '../common/middlewares/socketMiddleware.js';
import appReducer from './appSlice.js';
import channelsReducer from '../features/chat/channelsSlice.js';
import messagesReducer from '../features/chat/messagesSlice.js';
import modalsReducer from '../features/modals/modalsSlice.js';

const store = configureStore({
  reducer: {
    app: appReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(socketMiddleware()),
});

export default store;
