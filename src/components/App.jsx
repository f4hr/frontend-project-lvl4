// @ts-check

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Login from './Login.jsx';

export default function App() {
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <div className="container-lg h-100 py-3">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

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
