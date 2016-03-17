'use strict';

import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import {Subject, Observable} from 'rx';
import app from './components/App';
import * as actionCreators from './action_creators.js';
import wrapIntoBehaviour from './utils/wrapIntoBehaviour';
import reducer from './reducer';

const createAppState = (initState, action$) =>
  wrapIntoBehaviour(initState, action$.scan(reducer, initState));

const appActions$ = new Subject();

const appState$ = createAppState({
  hash: location.hash
}, appActions$);

const hashChange$ = Observable.fromEvent(window, 'hashchange');
hashChange$.subscribe(hash => appActions$.onNext(actionCreators.hashChange(location.hash)));

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => appActions$.onNext(actionCreators.setState(state)));

appActions$.subscribe(action => {
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
});

const {element: App, events} = app(appState$);

events.vote$ && events.vote$.subscribe(entry => {
  appActions$.onNext(actionCreators.vote(entry));
});

ReactDOM.render(
  App,
  document.getElementById('app')
);

