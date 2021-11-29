// @ts-check

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Container } from 'react-bootstrap';
import authContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';
import Navigation from '../components/common/Navigation.jsx';
import Login from '../components/login/Login.jsx';
import Chat from '../components/chat/Chat.jsx';
import Modals from '../components/modals/Modals.jsx';
import Signup from '../components/signup/Signup.jsx';

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
    <authContext.Provider
      value={{
        username,
        loggedIn,
        logIn,
        logOut,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

const ChatRoute = () => {
  const auth = useAuth();

  const render = ({ location }) => {
    if (!auth.loggedIn) {
      return (
        <Redirect to={{ pathname: '/login', state: { from: location } }} />
      );
    }

    return <Chat />;
  };

  return <Route render={render} />;
};

function NoMatch() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="text-center py-3">
      <h3>{t('notFound.title')}</h3>
      <p>
        {t('notFound.description', { path: location.pathname })}
      </p>
    </div>
  );
}

const App = () => (
  <AuthProvider>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navigation />
        <Container fluid className="h-100 px-0">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/signup">
              <Signup />
            </Route>
            <Route exact path="/">
              <ChatRoute />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Container>
        <ToastContainer position="top-center" />
      </div>
    </Router>
    <Modals />
  </AuthProvider>
);

export default App;
