'use strict';

import React from 'react';
import winner from './Winner';
import {dom} from 'react-reactive-class';
import {Subject} from 'rx';
import wrapIntoBehaviour from '../utils/wrapIntoBehaviour.js';

const {div: Div, h1: H1, button: Button} = dom;

export const results = (props$) => {
  const next$ = new Subject();

  const resultsElement = <Div>
    <Div>
    {props$.pluck('pair').map(pair => pair && pair.map(entry =>
      <div key={entry}>
        <h1>{entry}</h1>
        <Div>
          {props$.pluck('tally', entry) || 0}
        </Div>
      </div>
      ))}
    </Div>
    <button onClick={next$.onNext.bind(next$)}>Next</button>
  </Div>;

  return {
    element: <Div>
      {props$.getValue().winner ? winner(props$.pluck('winner')).element : resultsElement}
    </Div>,
    events: {
      next$
    }
  }
};

export const resultsContainer = (state$) => results(wrapIntoBehaviour(null, state$.map(state => ({
  pair: state.vote && state.vote.pair,
  tally: state.vote && state.vote.tally,
  winner: state.winner
}))));

