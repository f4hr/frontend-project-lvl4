// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import io from 'socket.io-client';
import './styles/application.scss';
import { render } from 'react-dom';
import init from './init.jsx';

init(io()).then((vdom) => render(vdom, document.querySelector('#chat')));

export default init;
