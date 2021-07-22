// @ts-check

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Redirect,
} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import store from './store.js';
import Navigation from '../common/Navigation.jsx';
import Login from '../features/login/Login.jsx';
import Chat from '../features/chat/Chat.jsx';
import authContext from '../common/contexts/index.jsx';
import useAuth from '../common/hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const isTokenSet = localStorage.getItem('userId') !== null;
  const [loggedIn, setLoggedIn] = useState(isTokenSet);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children, path }) => {
  const auth = useAuth();

  return (
    <Route
      path={path}
      render={({ location }) => (auth.loggedIn
        ? children
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />)}
    />
  );
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
  <Provider store={store}>
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Navigation />
          <Container fluid className="h-100 px-0">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <PrivateRoute path="/">
                <Chat />
              </PrivateRoute>
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </Container>
        </div>
      </Router>
    </AuthProvider>
  </Provider>
);

export default App;
