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

        it('should put winner of current vote back to entries', () => {
            const state = fromJS({
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally:{
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    }
                },
                entries: ['Sunshine', 'Millions', '127 Hours']
            });
            const nextState = next(state);

            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['Sunshine', 'Millions']
                },
                entries: ['127 Hours', 'Trainspotting']
            }));
        });

        it('should put both entries back when tied', () => {
            const state = fromJS({
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally:{
                        'Trainspotting': 4,
                        '28 Days Later': 4
                    }
                },
                entries: ['Sunshine', 'Millions', '127 Hours']
            });
            const nextState = next(state);

            expect(nextState).to.equal(fromJS({
                vote: {
                    pair: ['Sunshine', 'Millions']
                },
                entries: ['127 Hours', 'Trainspotting', '28 Days Later']
            }));
        });

        it('should mark winner when just one entry left', () => {
            const state = fromJS({
                vote: {
                    pair: ['Trainspotting', '28 Days Later'],
                    tally:{
                        'Trainspotting': 4,
                        '28 Days Later': 2
                    }
                },
                entries: []
            });
            const nextState = next(state);

            expect(nextState).to.equal(fromJS({
                winner: 'Trainspotting'
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
