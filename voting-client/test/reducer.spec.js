'use strict';

import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('should handle SET_STATE', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: Map({
        vote: Map({
          pair: List.of('a', 'b'),
          tally: Map({a: 1})
        })
      })
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: [ 'a', 'b' ],
        tally: { a: 1 }
      }
    }));
  });

  it('should handle SET_STATE with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: [ 'a', 'b' ],
          tally: { a: 1 }
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: [ 'a', 'b' ],
        tally: { a: 1 }
      }
    }));
  });

  it('should handle SET_STATE without initial state', () => {
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: [ 'a', 'b' ],
          tally: { a: 1 }
        }
      }
    };
    const nextState = reducer(undefined, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: [ 'a', 'b' ],
        tally: { a: 1 }
      }
    }));
  });

  it('should set hasVoted on VOTE', () => {
    const state = fromJS({
      vote: {
        pair: ['a', 'b']
      }
    });

    const action = { type: 'VOTE', entry: 'a'};
    const nextState = reducer(state, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['a', 'b']
      },
      hasVoted: 'a'
    }));
  })

  it('should remove hasVoted on SET_STATE if pair changes', () => {
    const initialState = fromJS({
      vote: {
        pair: [ 'a', 'b' ],
      },
      hasVoted: 'a'
    });

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: [ 'b', 'c' ]
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: [ 'b', 'c' ]
      }
    }))
  });
});
