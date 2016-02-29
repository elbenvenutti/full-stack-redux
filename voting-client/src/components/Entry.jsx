'use strict';

import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],

  render: function () {
    return <button onClick={() => this.props.voteForThis()} disabled={this.props.disabled}>
      <h1>{this.props.entry}</h1>
      {this.props.hasVotedThisEntry ? <div>Voted</div> : null}
    </button>;
  }
})
