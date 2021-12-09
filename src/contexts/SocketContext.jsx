// @ts-check

import { createContext } from 'react';

const SocketContext = createContext({
  sendMessage: () => {},
  addNewChannel: () => {},
  renameChannel: () => {},
  removeChannel: () => {},
});

export default SocketContext;
