// @ts-check

import React from 'react';
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
import routes from '../routes.js';
import { useAuth } from '../hooks/index.jsx';
import Navigation from '../components/common/Navigation.jsx';
import Login from '../components/login/Login.jsx';
import Chat from '../components/chat/Chat.jsx';
import Modals from '../components/modals/Modals.jsx';
import Signup from '../components/signup/Signup.jsx';

function PrivateRoute({ path, exact, children }) {
  const { loggedIn } = useAuth();

  const render = ({ location }) => {
    if (loggedIn) return children;

    return (
      <Redirect to={{ pathname: routes.loginPath(), state: { from: location } }} />
    );
  };

  return <Route exact={exact} path={path} render={render} />;
}

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
  <>
    <Router>
      <div className="d-flex flex-column h-100">
        <Navigation />
        <Container fluid className="h-100 px-0">
          <Switch>
            <Route path={routes.loginPath()}>
              <Login />
            </Route>
            <Route path={routes.signupPath()}>
              <Signup />
            </Route>
            <PrivateRoute exact path={routes.homePath()}>
              <Chat />
            </PrivateRoute>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </Container>
        <ToastContainer position="top-center" />
      </div>
    </Router>
    <Modals />
  </>
);

export default App;
