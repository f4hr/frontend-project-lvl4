// @ts-check

import { createContext } from 'react';

const SocketContext = createContext({
  sendMessage: (message) => {},
  addNewChannel: (name) => {},
  renameChannel: (name) => {},
  removeChannel: (id) => {},
});

export default SocketContext;
