// @ts-check

import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Container,
  Navbar,
  Nav,
  Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/index.jsx';
import LanguageSelector from './LanguageSelector.jsx';

const AuthButton = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut} variant="primary">{t('nav.logOut')}</Button>
      : <Button as={Link} to="/login" variant="primary">{t('nav.logIn')}</Button>
  );
};

const Navigation = () => (
  <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow">
    <Container fluid>
      <Navbar.Brand as={Link} to="/">Hexlet-Chat</Navbar.Brand>
      <Nav>
        <LanguageSelector />
        <AuthButton />
      </Nav>
    </Container>
  </Navbar>
);

export default Navigation;
