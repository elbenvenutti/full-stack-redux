import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
    describe('setEntries', () => {
        it('should add entries to the state', () => {
            const state = Map();
            const entries = [ 'Trainspotting', '28 Days Later' ];
            const nextState = setEntries(state, entries);

            expect(nextState).to.equal(Map({
                entries: List.of('Trainspotting', '28 Days Later')
            }))
        });
    });

    describe('next', () => {
        it ('should take the next two entries under vote', () => {
            const state = Map({
                entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
            });
            const nextState = next(state);

            expect(nextState).to.equal(Map({
                vote: Map ({
                    pair: List.of('Trainspotting', '28 Days Later')
                }),
                entries: List.of('Sunshine')
            }));
        });
    });

    describe('vote', () => {
        it('should create a tally for the voted entry', () => {
            const state = fromJS({
                vote: {
                    pair: [ 'Trainspotting', '28 Days Later' ]
                }
            });
            const nextState = vote(state, 'Trainspotting');

            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {
                        'Trainspotting': 1
                    }
                }
            }));
        });

        it('should add to existing tally for the voted entry', () => {
            const state = fromJS({
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {
                        'Trainspotting': 3,
                        '28 Days Later': 2
                    }
                }
            });
            const nextState = vote(state, 'Trainspotting');

            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally: {
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    }
                }
            }));
        });
    });
});
