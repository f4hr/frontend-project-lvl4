// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import './styles/application.scss';
import { render } from 'react-dom';
import init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const app = init();
render(app, document.querySelector('#chat'));
