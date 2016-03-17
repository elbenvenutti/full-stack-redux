'use strict';

import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
  it('should handle SET_STATE', () => {
    const initialState = {};
    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: ['a', 'b'],
          tally: {a: 1}
        }
      }
    };
    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      vote: {
        pair: [ 'a', 'b' ],
        tally: { a: 1 }
      }
    });
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

    expect(nextState).to.deep.equal({
      vote: {
        pair: [ 'a', 'b' ],
        tally: { a: 1 }
      }
    });
  });

  it('should set hasVoted on VOTE', () => {
    const state = {
      vote: {
        pair: ['a', 'b']
      }
    };

    const action = { type: 'VOTE', entry: 'a'};
    const nextState = reducer(state, action);

    expect(nextState).to.deep.equal({
      vote: {
        pair: ['a', 'b']
      },
      hasVoted: 'a'
    });
  })

  it('should remove hasVoted on SET_STATE if pair changes', () => {
    const initialState = {
      vote: {
        pair: [ 'a', 'b' ],
      },
      hasVoted: 'a'
    };

    const action = {
      type: 'SET_STATE',
      state: {
        vote: {
          pair: [ 'b', 'c' ]
        }
      }
    };

    const nextState = reducer(initialState, action);

    expect(nextState).to.deep.equal({
      vote: {
        pair: [ 'b', 'c' ]
      }
    })
  });
});
