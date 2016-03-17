'use strict';

import React from 'react';
import {dom} from 'react-reactive-class';
import {Subject} from 'rx';

const {button: Button, h1: H1, div: Div} = dom;

export default ({entry, hasVoted$}) => {
  const vote$ = new Subject();
  const votedThis$ = hasVoted$.map(hasVoted => hasVoted === entry ? <div>Voted</div> : null);
  const element = <Button key={entry} onClick={vote$.onNext.bind(vote$)} disabled={hasVoted$}>
    <H1>{entry}</H1>
    <Div>{votedThis$}</Div>
  </Button>;

  return {
    element,
    events: {
      vote$
    }
  };
};
