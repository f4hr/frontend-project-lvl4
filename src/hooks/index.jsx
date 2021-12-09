// @ts-check

import { useContext } from 'react';

import AuthContext from '../contexts/AuthContext.jsx';
import SocketContext from '../contexts/SocketContext.jsx';

export const useAuth = () => useContext(AuthContext);
export const useSocket = () => useContext(SocketContext);
