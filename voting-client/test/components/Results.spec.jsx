'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import {List, Map} from 'immutable';
import {Results} from '../../src/components/Results';
import {expect} from 'chai';

describe('Results', () => {
  it('should invoke the next callback when next button is clicked', () => {
    let nextInvoked = false;
    const next = () => nextInvoked = true;

    const pair = List.of('a', 'b');
    const component = renderIntoDocument(<Results pair={pair} tally={Map()} next={next} />);

    Simulate.click(ReactDOM.findDOMNode(component.refs.next));

    expect(nextInvoked).to.be.true;
  });

  it('should render the winner when there is one', () => {
    const component = renderIntoDocument(<Results winner="a" pair={['a', 'b']} tally={Map()} />);
    const winner = ReactDOM.findDOMNode(component.refs.winner);

    expect(winner.textContent).to.contain('a');
  });
});

