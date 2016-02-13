import {Map, fromJS} from 'immutable';
import {expect} from 'chai';
import {describe, it} from 'mocha';
import reducer from '../src/reducer';

describe('reducer', () => {
    it('should handle SET_ENTRIES', () => {
        const initialState = Map();
        const action = { type: 'SET_ENTRIES', entries: ['Trainspotting']};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: [ 'Trainspotting' ]
        }));
    });

    it('should handle NEXT', () => {
        const initialState = fromJS({
            entries: ['Trainspotting', '28 Days Later']
        });
        const action = { type: 'NEXT' };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: [ 'Trainspotting', '28 Days Later' ]
            },
            entries: []
        }));
    });

    it('should handle VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: [ 'Trainspotting', '28 Days Later' ]
            }
        });
        const action = {type: 'VOTE', entry: 'Trainspotting'};
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: {
                    Trainspotting: 1
                }
            }
        }));
    });

    it('should have an initial state', () => {
        const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
        const nextState = reducer(undefined, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });
});
