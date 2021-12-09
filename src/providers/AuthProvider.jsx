// @ts-check

import React, { useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
  const getInitialState = () => localStorage.getItem('userId') !== null;
  const [loggedIn, setLoggedIn] = useState(getInitialState);
  const [username, setUsername] = useState('unknown');

  const logIn = () => {
    setLoggedIn(true);
  };

  const logOut = () => {
    setLoggedIn(false);
  };

  useEffect(() => {
    if (loggedIn) {
      const user = JSON.parse(localStorage.getItem('userId'));
      setUsername(user.username);
    } else {
      localStorage.removeItem('userId');
      setUsername('unknown');
    }
  }, [loggedIn]);

  return (
    <AuthContext.Provider
      value={{
        username,
        loggedIn,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
