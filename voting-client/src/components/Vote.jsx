'use strict';

import React from 'react';
import entryButton from './EntryButton';
import {dom} from 'react-reactive-class';
import {Subject} from 'rx';

const {div: Div} = dom;

export default (props$) => {
  const pair$ = props$.pluck('pair');
  const hasVoted$ = props$.pluck('hasVoted');
  const vote$ = new Subject();

  const element = <Div>
    {pair$.map(pair => pair && pair.map(entry => {
      const {element: EntryButton, events} = entryButton({
        entry,
        hasVoted$
      });

      events.vote$.subscribe(() => {
        vote$.onNext(entry);
      })
      return EntryButton;
    }))}
  </Div>

  return {
    element,
    events: {
      vote$
    }
  };
};
