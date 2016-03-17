'use strict';

import React from 'react';
import winner from './Winner';
import vote from './Vote';
import wrapIntoBehaviour from '../utils/wrapIntoBehaviour';

export const voting = (props$) => {
  return props$.getValue().winner ? winner(props$.pluck('winner')) : vote(props$);
};

export const votingContainer = (state$) => voting(wrapIntoBehaviour(null, state$.map(state => ({
  pair: state.vote && state.vote.pair,
  winner: state.winner,
  hasVoted: state.hasVoted
}))));
