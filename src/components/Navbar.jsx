import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Simple Slack</a>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Главная</Link>
          <Link className="nav-link" to="/login">Войти</Link>
        </div>
      </div>
    </nav>
  );
}
