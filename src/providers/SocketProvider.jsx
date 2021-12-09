// @ts-check

import React from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import SocketContext from '../contexts/SocketContext.jsx';
import actions from '../slices/index.js';

const SocketProvider = ({ socket, children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const sendMessage = (message) => {
    socket.emit('newMessage', message, ({ status }) => {
      if (status !== 'ok') toast.error(t('messages.errors.send'));
    });
  };

  const addNewChannel = (channel) => {
    socket.emit('newChannel', channel, ({ status, data }) => {
      if (status === 'ok') {
        dispatch(actions.addNewChannelSuccess(data));
        toast.success(t('newChannel.success'));
      } else {
        dispatch(actions.addNewChannelFailure());
        toast.error(t('channels.errors.new'));
      }
    });
  };

  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, ({ status }) => {
      if (status === 'ok') {
        dispatch(actions.renameChannelSuccess());
        toast.success(t('renameChannel.success'));
      } else {
        dispatch(actions.renameChannelFailure());
        toast.error(t('channels.errors.rename'));
      }
    });
  };

  const removeChannel = (channelId) => {
    socket.emit('removeChannel', channelId, ({ status }) => {
      if (status === 'ok') {
        dispatch(actions.removeChannelSuccess());
        toast.success(t('removeChannel.success'));
      } else {
        dispatch(actions.removeChannelSuccess());
        toast.error(t('channels.errors.remove'));
      }
    });
  };

  return (
    <SocketContext.Provider
      value={{
        sendMessage,
        addNewChannel,
        renameChannel,
        removeChannel,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
