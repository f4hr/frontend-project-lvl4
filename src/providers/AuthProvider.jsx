// @ts-check

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../routes.js';
import storage from '../utils/storage.js';
import AuthContext from '../contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
  const userData = storage.getUser();

  const [user, setUser] = useState(userData);
  const [username, setUsername] = useState(userData?.username ?? null);
  const [loggedIn, setLoggedIn] = useState(Boolean(userData?.token));

  const authorize = async (path, data) => {
    try {
      const res = await axios.post(path, data);

      storage.setUser(res.data);
      setUser(res.data);
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        setUser(null);
      }

      throw err;
    }
  };

  const signUp = async (payload) => {
    await authorize(routes.apiSignupPath(), payload);
  };

  const logIn = async (payload) => {
    await authorize(routes.apiLoginPath(), payload);
  };

  const logOut = () => {
    setUser(null);
  };

  useEffect(() => {
    if (user) {
      setLoggedIn(true);
      setUsername(user.username);
    } else {
      setLoggedIn(false);
      setUsername(null);
      storage.removeUser();
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        username,
        loggedIn,
        logIn,
        logOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
