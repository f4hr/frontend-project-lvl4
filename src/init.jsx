// @ts-check

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider as StoreProvider } from 'react-redux';
import constants from './constants.js';
import actions from './slices/index.js';
import RollbarProvider from './providers/RollbarProvider.jsx';
import SocketProvider from './providers/SocketProvider.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import getStore from './app/store.js';
import getI18n from './utils/i18n.js';
import App from './app/App.jsx';

const init = async (socketClient) => {
  if (process.env.NODE_ENV !== 'production') {
    localStorage.debug = 'chat:*';
  }

  const store = getStore();
  const i18nInstance = await getI18n({ language: constants.LANG });
  const {
    newChannel,
    renameChannel,
    removeChannel,
    newMessage,
  } = actions;

  socketClient.on('newMessage', (message) => {
    store.dispatch(newMessage(message));
  });
  socketClient.on('newChannel', (channel) => {
    store.dispatch(newChannel(channel));
  });
  socketClient.on('renameChannel', (channel) => {
    store.dispatch(renameChannel(channel));
  });
  socketClient.on('removeChannel', (channel) => {
    store.dispatch(removeChannel(channel));
  });

  return (
    <RollbarProvider>
      <StoreProvider store={store}>
        <I18nextProvider i18n={i18nInstance}>
          <SocketProvider socket={socketClient}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SocketProvider>
        </I18nextProvider>
      </StoreProvider>
    </RollbarProvider>
  );
};

export default init;
