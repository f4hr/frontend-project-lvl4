// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import io from 'socket.io-client';
import { render } from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';
import './styles/application.scss';
import init from './init.jsx';

const app = async () => {
  const vdom = await init(io());
  render(vdom, document.querySelector('#chat'));
};

app();

export default app;
