'use strict';

import React from 'react';
import {connect} from 'react-redux';
import winner from './Winner';
import vote from './Vote';
import * as actionCreators from '../action_creators';

export const Voting = React.createClass({
  render: function () {
    return <div className="voting">
      {this.props.winner ?
        winner(this.props).element :
        vote(this.props).element
      }
    </div>;
  }
});

let mapStateToProps = state => ({
  pair: state.getIn([ 'vote', 'pair' ]),
  winner: state.get('winner'),
  hasVoted: state.get('hasVoted')
});

export const votingContainer = () => ({
  element: connect(mapStateToProps, actionCreators)(Voting)
});
