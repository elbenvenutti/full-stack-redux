'use strict';

import {Map, List} from 'immutable';

const setState = (state, newState) => state.merge(newState);

const vote = (state, entry) => state.set('hasVoted', entry);

const resetVote = (state) => {
  const hasVoted = state.get('hasVoted');
  const currentPair = state.getIn(['vote', 'pair'], List());

  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
  } else {
    return state;
  }
};

export default (state = Map(), action) => {
  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
      break;
    case 'VOTE':
      return vote(state, action.entry);
      break;
  }
  return state;
};
