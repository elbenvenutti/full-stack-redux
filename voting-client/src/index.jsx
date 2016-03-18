'use strict';

import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import {Subject, Observable} from 'rx';
import app from './components/App';
import * as actionCreators from './action_creators.js';
import wrapIntoBehaviour from './utils/wrapIntoBehaviour';
import reducer from './reducer';

const initAppState = (initialState, action$) =>
  wrapIntoBehaviour(initialState, action$.scan(reducer, initialState));

window.appActions$ = new Subject();

const appState$ = initAppState({
  hash: location.hash
}, window.appActions$);

const hashChange$ = Observable.fromEvent(window, 'hashchange');
hashChange$.subscribe(hash => window.appActions$.onNext(actionCreators.hashChange(location.hash)));

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state => window.appActions$.onNext(actionCreators.setState(state)));

window.appActions$.subscribe(action => {
  if (action.meta && action.meta.remote) {
    socket.emit('action', action);
  }
});

const {element: App, events} = app(appState$);

events.vote$ && events.vote$.subscribe(entry => {
  window.appActions$.onNext(actionCreators.vote(entry));
});

events.next$ && events.next$.subscribe(() => {
  window.appActions$.onNext(actionCreators.next());
})
ReactDOM.render(
  App,
  document.getElementById('app')
);

