'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Entry from './Entry';

export default React.createClass({
  mixins: [PureRenderMixin],

  getPair: function () {
    return this.props.pair || [];
  },

  hasVotedFor: function(entry) {
    return this.props.hasVoted === entry;
  },

  voteFor: function(entry) {
    return () => this.props.vote(entry);
  },

  render: function () {
    return <div>
      { this.getPair().map(entry =>
                           <Entry
                             key={entry}
                             entry={entry}
                             voteForThis={this.voteFor(entry)}
                             disabled={!!this.props.hasVoted}
                             hasVotedThisEntry={this.hasVotedFor(entry)} />
        ) }
    </div>;
  }
});
