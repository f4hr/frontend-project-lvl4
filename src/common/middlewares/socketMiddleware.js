// @ts-check

import { io } from 'socket.io-client';
import { get, noop } from 'lodash';
import {
  actions as messagesActions,
  serverActions as messagesServerActions,
} from '../../features/chat/messagesSlice.js';
import {
  actions as channelsActions,
  serverActions as channelsServerActions,
} from '../../features/chat/channelsSlice.js';

const actions = {
  ...messagesActions,
  ...channelsActions,
};
const serverActions = [
  ...messagesServerActions,
  ...channelsServerActions,
];

const socketMiddleware = () => (storeAPI) => {
  const socket = io();

  serverActions.forEach((action) => {
    socket.on(action, (response) => {
      storeAPI.dispatch(actions[action](response));
    });
  });

  return (next) => (action) => {
    if (get(action, 'payload.type', null) !== 'socket') {
      return next(action);
    }

    const requestActions = action.payload.actions;

    socket.emit(requestActions.request, (action.payload.body), (response) => {
      if (response.status === 'ok') {
        storeAPI.dispatch(actions[requestActions.success](response));
      } else {
        storeAPI.dispatch(actions[requestActions.failure]());
      }
    });

    return noop();
  };
};

export default socketMiddleware;
