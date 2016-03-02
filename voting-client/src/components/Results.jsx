'use strict';

import React from 'react';
import {connect} from 'react-redux';
import winner from './Winner';

export const Results = React.createClass({
  getPair: function () {
    return this.props.pair || [];
  },

  getVotes: function (entry) {
    return this.props.tally && this.props.tally.has(entry) ? this.props.tally.get(entry) : 0;
  },

  render: function () {
    return this.props.winner ? winner(this.props).element : <div>
      {this.getPair().map(entry =>
        <div key={entry}>
          <h1>{entry}</h1>
          <div>
            {this.getVotes(entry)}
          </div>
        </div>
      )}
      <div>
        <button ref="next" onClick={this.props.next}>Next</button>
      </div>
    </div>;
  }
});

const mapStateToProps = (state) => ({
  pair: state.getIn(['vote', 'pair']),
  tally: state.getIn(['vote', 'tally']),
  winner: state.get('winner')
});

export const ResultsContainer = connect(mapStateToProps)(Results);

export const resultsContainer = () => ({
  element: ResultsContainer
});
