import React from 'react';
import {
  Container,
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut} variant="primary">Выйти</Button>
      : <Button as={Link} to="/login" variant="primary">Войти</Button>
  );
};

const Navigation = () => (
  <Navbar bg="light" expand="lg">
    <Container fluid>
      <Navbar.Brand as={Link} to="/">Simple Slack</Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/">Главная</Nav.Link>
        <AuthButton />
      </Nav>
    </Container>
  </Navbar>
);

export default Navigation;
