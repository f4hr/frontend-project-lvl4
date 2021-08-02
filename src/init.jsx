// @ts-check

import React from 'react';
import { Provider } from 'react-redux';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import store from './app/store.js';
import App from './app/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const init = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default init;
