'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

export const Voting = React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    return <div className="voting">
      {this.props.winner ?
        <Winner ref="winner" winner={ this.props.winner } /> :
        <Vote pair={ this.props.pair } vote={ this.props.vote } hasVoted={ this.props.hasVoted } />
      }
    </div>;
  }
});

let mapStateToProps = state => ({
  pair: state.getIn([ 'vote', 'pair' ]),
  winner: state.get('winner'),
  hasVoted: state.get('hasVoted')
});

export const VotingContainer = connect(mapStateToProps, actionCreators)(Voting);
