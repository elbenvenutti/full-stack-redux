'use strict';

import React from 'react';

export default (props) => {
  const {voteForThis, disabled, entry, hasVotedThisEntry} = props;

  const element = <button key={entry} onClick={voteForThis} disabled={disabled}>
    <h1>{entry}</h1>
    {hasVotedThisEntry ? <div>Voted</div> : null}
  </button>;

  return {element};
};
