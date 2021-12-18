// @ts-check

import { createContext } from 'react';

const AuthContext = createContext({
  username: null,
  loggedIn: false,
  signUp: async () => {},
  logIn: async () => {},
  logOut: () => {},
});

export default AuthContext;
