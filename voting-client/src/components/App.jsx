'use strict';

import React from 'react';
import {votingContainer} from './Voting';
import {resultsContainer} from './Results';
import {dom} from 'react-reactive-class';

const {div: Div} = dom;

export default state$ => {
  const results = resultsContainer(state$);
  const voting = votingContainer(state$);
  return {
    element: <div>
      <Div mount={state$.map(state => state.hash === '#results')}>
        {results.element}
      </Div>
      <Div mount={state$.map(state => state.hash !== '#results')}>
        {voting.element}
      </Div>
    </div>,
    events: Object.assign(results.events, voting.events)
  }
}
