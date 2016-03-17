'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, findRenderedDOMComponentWithTag, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import {voting} from '../../src/components/Voting';
import {expect} from 'chai';
import {BehaviorSubject} from 'rx';

describe('Voting', () => {
  it('should render a pair of buttons', () => {
    const component = renderIntoDocument(
      voting(new BehaviorSubject({ pair: ['aaa', 'bbb'] })).element
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.equal('aaa');
    expect(buttons[1].textContent).to.equal('bbb');
  });

  it('should notify when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const {element, events} = voting(new BehaviorSubject({ pair: ['aaa', 'bbb'] }));
    events.vote$.subscribe(entry => votedWith = entry);
    const component = renderIntoDocument(element);

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[1]);

    expect(votedWith).to.equal('bbb');

    Simulate.click(buttons[0]);
    expect(votedWith).to.equal('aaa');
  });

  it('should disable buttons when user has voted', () => {
    const component = renderIntoDocument(
      voting(new BehaviorSubject({ pair: ['aaa', 'bbb'], hasVoted: 'aaa' })).element
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.be.true;
    expect(buttons[1].hasAttribute('disabled')).to.be.true;
  });

  it('should add a label to the voted entry', () => {
    const component = renderIntoDocument(
      voting(new BehaviorSubject({ pair: ['aaa', 'bbb'], hasVoted: 'bbb' })).element
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).not.to.contain('Voted');
    expect(buttons[1].textContent).to.contain('Voted');
  });

  it('should render just the winner when there is one', () => {
    const component = renderIntoDocument(
      voting(new BehaviorSubject({winner: 'abc'})).element
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(0);

    const winner = findRenderedDOMComponentWithTag(component, 'span');
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('abc');
  });
});
