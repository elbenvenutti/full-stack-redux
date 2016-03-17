'use strict';

import {Observable} from 'rx';

const setState = (state, newState) => Object.assign(state, newState);

const vote = (state, entry) => Object.assign(state, {hasVoted: entry});

const resetVote = (state) => {
  const hasVoted = state.hasVoted;
  const currentPair = state.vote.pair || [];

  if (hasVoted && currentPair.indexOf(hasVoted) === -1) {
    delete(state.hasVoted);
  }

  return state;
};

export default (state = {}, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return resetVote(setState(state, action.state));
    case 'VOTE':
      return vote(state, action.entry);
  case 'HASH_CHANGE':
      return Object.assign(state, {hash: action.hash});
  }
  return state;
};
