// @ts-check

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import initRollbar from './rollbar.js';
import store from './app/store.js';
import i18n from './i18n.js';
import App from './app/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
if (process.env.NODE_ENV === 'production') {
  initRollbar();
}
console.log(process.env.NODE_ENV);
console.log(process.env.ROLLBAR_ACCESS_TOKEN);

const init = () => (
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>
);

export default init;
