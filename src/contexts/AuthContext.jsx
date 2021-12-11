// @ts-check

import { createContext } from 'react';

const AuthContext = createContext({
  userId: null,
  loggedIn: false,
  signUp: async () => {},
  logIn: async () => {},
  logOut: () => {},
});

export default AuthContext;
