// @ts-check

import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from 'react-router-dom';
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

// TODO: something is not right
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
  const location = useLocation();

  return (
    <div>
      <h3>Not found</h3>
      <p>
        No match for
        <code>{location.pathname}</code>
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
      </div>
    </Router>
    <Modals />
  </AuthProvider>
);

export default App;
