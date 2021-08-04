// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import './styles/application.scss';
import { render } from 'react-dom';
import init from './init.jsx';

const app = init();

render(app, document.querySelector('#chat'));
