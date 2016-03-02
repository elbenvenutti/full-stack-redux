'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import app from './components/App';
import {Provider} from 'react-redux';

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => store.dispatch(setState(state)));

const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  app(store).element,
  document.getElementById('app')
);
