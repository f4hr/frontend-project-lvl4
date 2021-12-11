// @ts-check

import { createContext } from 'react';

const SocketContext = createContext({
  newMessage: async () => {},
  newChannel: async () => {},
  renameChannel: async () => {},
  removeChannel: async () => {},
});

export default SocketContext;
