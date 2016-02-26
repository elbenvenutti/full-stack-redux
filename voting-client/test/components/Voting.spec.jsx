'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import {Voting} from '../../src/components/Voting';
import {expect} from 'chai';

describe('Voting', () => {
  it('should render a pair of buttons', () => {
    const component = renderIntoDocument(
      <Voting pair={["Trainspotting", "28 Days Later"]} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.equal('Trainspotting');
    expect(buttons[1].textContent).to.equal('28 Days Later');
  });

  it('should invoke a callback when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const component = renderIntoDocument(
      <Voting pair={[ 'a', 'b' ]} vote={vote} />
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[1]);

    expect(votedWith).to.equal('b');

    Simulate.click(buttons[0]);
    expect(votedWith).to.equal('a');
  });

  it('should disable buttons when user has voted', () => {
    const component = renderIntoDocument(<Voting pair={['a', 'b']} hasVoted="a" />);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.be.true;
    expect(buttons[1].hasAttribute('disabled')).to.be.true;
  });

  it('should add a label to the voted entry', () => {
    const component = renderIntoDocument(<Voting pair={['a', 'b']} hasVoted="b" />);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).not.to.contain('Voted');
    expect(buttons[1].textContent).to.contain('Voted');
  });

  it('should render just the winner when there is one', () => {
    const component = renderIntoDocument(<Voting winner="abc" />);
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(0);

    const winner = ReactDOM.findDOMNode(component.refs.winner);
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('abc');
  });
});
