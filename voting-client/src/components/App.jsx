'use strict';

import React, {createElement} from 'react';
import {Router, Route, hashHistory} from 'react-router';
import {votingContainer} from './Voting';
import {resultsContainer} from './Results';
import {List, Map} from 'immutable';

const rootContainer = () => ({
  element: React.createClass({
    render: function () {
      return this.props.children;
    }
  })
});

const routes = () => <Route component={rootContainer}>
  <Route path="/results" component={resultsContainer} />
  <Route path="/" component={votingContainer} />
</Route>;

export default (store) => {
  const createElement = (component, props) => {
    const Component = component().element;

    return <Component store={store} {...props} />;
  };

  return {
    element: <Router history={hashHistory} createElement={createElement}>{routes()}</Router>
  };
}
