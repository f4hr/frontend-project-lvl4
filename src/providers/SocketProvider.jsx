// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';
import constants from '../constants.js';
import SocketContext from '../contexts/SocketContext.jsx';

const SocketProvider = ({ socket, children }) => {
  const { t } = useTranslation();

  const promisify = (fn) => (...args) => new Promise((resolve, reject) => {
    const timerId = setTimeout(() => {
      reject(new Error(t('errors.network')));
    }, constants.CONNECTION_TIMEOUT);
    fn(...args, ({ data, status }) => {
      clearTimeout(timerId);
      if (status === 'ok') resolve(data);
      reject(new Error(t('errors.server')));
    });
  });

  const newMessage = promisify((...payload) => socket.emit('newMessage', ...payload));
  const newChannel = promisify((...payload) => socket.emit('newChannel', ...payload));
  const renameChannel = promisify((...payload) => socket.emit('renameChannel', ...payload));
  const removeChannel = promisify((...payload) => socket.emit('removeChannel', ...payload));

  return (
    <SocketContext.Provider
      value={{
        newMessage,
        newChannel,
        renameChannel,
        removeChannel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
