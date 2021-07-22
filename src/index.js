// @ts-check

import ReactDOM from 'react-dom';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import App from './app/App.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(
  App(),
  document.getElementById('chat'),
);
