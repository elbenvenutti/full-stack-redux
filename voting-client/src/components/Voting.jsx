'use strict';

import React from 'react';
import winner from './Winner';
import vote from './Vote';
import {dom} from 'react-reactive-class';

const {div: Div} = dom;

export const voting = ({winner$, pair$, hasVoted$}) => {
  const {element: winnerElement} = winner(winner$);
  const {element: voteElement, events: voteEvents} = vote({pair$, hasVoted$});

  return {
    element: <div>
      <Div mount={winner$}>
        {winnerElement}
      </Div>
      <Div mount={!winner$}>
        {voteElement}
      </Div>
    </div>,
    events: voteEvents
  }
};

export const votingContainer = state$ => voting({
  pair$: state$.pluck('vote', 'pair'),
  winner$: state$.pluck('winner'),
  hasVoted$: state$.pluck('hasVoted')
});
