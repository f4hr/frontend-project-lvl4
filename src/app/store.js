// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import socketMiddleware from '../middlewares/socketMiddleware.js';
import appReducer from '../slices/appSlice.js';
import channelsReducer from '../slices/channelsSlice.js';
import messagesReducer from '../slices/messagesSlice.js';
import modalsReducer from '../slices/modalsSlice.js';

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
