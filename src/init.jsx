// @ts-check

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import getRollbar from './utils/rollbar.js';
import getStore from './app/store.js';
import getI18n from './utils/i18n.js';
import App from './app/App.jsx';
import {
  actions as messagesActions,
  serverActions as messagesServerActions,
} from './components/chat/messagesSlice.js';
import {
  actions as channelsActions,
  serverActions as channelsServerActions,
} from './components/chat/channelsSlice.js';

const init = async (socketClient) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }
  if (process.env.NODE_ENV === 'production') {
    const rollbar = getRollbar();
    rollbar.log('Hello world!');
  }
  const actions = {
    ...messagesActions,
    ...channelsActions,
  };
  const serverActions = [
    ...messagesServerActions,
    ...channelsServerActions,
  ];
  const store = getStore({ socketClient, actions, serverActions });
  const i18nInstance = await getI18n({ language: 'ru' });

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <App />
      </I18nextProvider>
    </Provider>
  );
};

export default init;
