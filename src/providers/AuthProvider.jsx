// @ts-check

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import routes from '../routes.js';
import AuthContext from '../contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
  const getInitialState = () => localStorage.getItem('userId') !== null;
  const [loggedIn, setLoggedIn] = useState(getInitialState);
  const [userId, setUserId] = useState(null);

  const authorize = async (path, data) => {
    try {
      const res = await axios.post(path, data);

      localStorage.setItem('userId', JSON.stringify(res.data));
      setLoggedIn(true);
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        setLoggedIn(false);
      }

      throw err;
    }
  };

  const signUp = async ({ username, password }) => {
    await authorize(routes.apiSignupPath(), { username, password });
  };

  const logIn = async ({ username, password }) => {
    await authorize(routes.apiLoginPath(), { username, password });
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  useEffect(() => {
    if (loggedIn) {
      const user = JSON.parse(localStorage.getItem('userId'));
      setUserId(user.username);
    } else {
      localStorage.removeItem('userId');
      setUserId(null);
    }
  }, [loggedIn]);

  return (
    <AuthContext.Provider
      value={{
        userId,
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
