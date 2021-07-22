// @ts-check

import React from 'react';
import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import App from './app/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = React.createElement(App);
ReactDOM.render(app, document.getElementById('chat'));
