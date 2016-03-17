'use strict';

import React, {createElement} from 'react';
import {votingContainer} from './Voting';
import {resultsContainer} from './Results';

export default state$ => {
  return state$.getValue().hash === '#results' ? resultsContainer(state$) : votingContainer(state$);
}
