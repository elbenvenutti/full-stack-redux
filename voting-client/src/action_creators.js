'use strict';

export const setState = (state) => ({
  type: 'SET_STATE',
  state
});

export const vote = (entry) => ({
  meta: { remote: true },
  type: 'VOTE',
  entry
});

export const hashChange = (hash) => ({
  type: 'HASH_CHANGE',
  hash
});

export const next = () =>({
  type: 'NEXT',
  meta: {remote: true}
});
