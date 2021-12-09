// @ts-check

import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../slices/appSlice.js';
import channelsReducer from '../slices/channelsSlice.js';
import messagesReducer from '../slices/messagesSlice.js';
import modalsReducer from '../slices/modalsSlice.js';

export default () => configureStore({
  reducer: {
    app: appReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
  },
});
