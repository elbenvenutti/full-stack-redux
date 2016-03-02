'use strict';

import React from 'react';
import entryButton from './EntryButton';

export default (props) => {
  const {pair, hasVoted, vote} = props;

  const voteFor = (entry) => () => vote(entry);

  const element = <div>
    {pair && pair.map(entry => entryButton({
        entry,
        voteForThis: voteFor(entry),
        disabled: !!hasVoted,
        hasVotedThisEntry: hasVoted === entry
      }).element)}
  </div>

  return {element};
};
