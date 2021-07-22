import React from 'react';
import {
  Container,
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from './hooks/index.jsx';

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut} variant="primary">Log Out</Button>
      : <Button as={Link} to="/login" variant="primary">Log In</Button>
  );
};

const Navigation = () => (
  <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow">
    <Container fluid>
      <Navbar.Brand as={Link} to="/">Simple Slack</Navbar.Brand>
      <Nav>
        <AuthButton />
      </Nav>
    </Container>
  </Navbar>
);

export default Navigation;
