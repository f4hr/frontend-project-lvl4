// @ts-check

import { get, noop } from 'lodash';

const socketMiddleware = ({ socketClient, actions, serverActions }) => (storeAPI) => {
  const socket = socketClient;

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
