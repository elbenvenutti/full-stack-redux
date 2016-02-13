import {List, Map} from 'immutable';

var getWinner = (vote) => {
    if (!vote) {
        return [];
    }
    const [a, b] = vote.get('pair').toJS();

    const aVotes = vote.getIn(['tally', a]);
    const bVotes = vote.getIn(['tally', b]);
    if (aVotes > bVotes) {
        return [a];
    } else if (bVotes > aVotes) {
        return [b];
    } else {
        return [a, b];
    }
};

export const INITIAL_STATE = Map();

export let setEntries = (state, entries) => {
    return state.set('entries', List(entries));
};

export let next = (state) => {
    const entries = state.get('entries').concat(getWinner(state.get('vote')));

    if (entries.size === 1) {
        return state.remove('vote')
            .remove('entries')
            .set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({pair: entries.take(2)}),
            entries: entries.skip(2)
        });
    }
};

export let vote = (voteState, entry) => {
    return voteState.updateIn(['tally', entry], 0, tally => tally + 1);
};
