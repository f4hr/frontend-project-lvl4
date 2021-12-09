// @ts-check

import { createContext } from 'react';

const AuthContext = createContext({
  username: '',
  loggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export default AuthContext;
