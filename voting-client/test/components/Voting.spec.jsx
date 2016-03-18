'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, findRenderedDOMComponentWithTag, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import {voting} from '../../src/components/Voting';
import {expect} from 'chai';
import {BehaviorSubject} from 'rx';
import {dom} from 'react-reactive-class';

const {div: Div} = dom;

const subject = (values) => {
  const output={};
  Object.keys(values).forEach((key) => {
    output[`${key}$`] = new BehaviorSubject(values[key]);
  });
  return output;
};

const wrapAndRenderIntoDocument = (element) => renderIntoDocument(<Div>{element}</Div>);

describe('Voting', () => {
  it('should render a pair of buttons', () => {
    const component = wrapAndRenderIntoDocument(
      voting(subject({pair: ['aaa', 'bbb'], hasVoted: null})).element
    );

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).to.equal('aaa');
    expect(buttons[1].textContent).to.equal('bbb');
  });

  it('should notify when a button is clicked', () => {
    let votedWith;
    const vote = (entry) => votedWith = entry;

    const {element, events} = voting(subject({pair: ['aaa', 'bbb'], hasVoted: null}));
    events.vote$.subscribe(entry => votedWith = entry);
    const component = wrapAndRenderIntoDocument(element);

    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[1]);

    expect(votedWith).to.equal('bbb');

    Simulate.click(buttons[0]);
    expect(votedWith).to.equal('aaa');
  });

  it('should disable buttons when user has voted', () => {
    const component = wrapAndRenderIntoDocument(
      voting(subject({ pair: ['aaa', 'bbb'], hasVoted: 'aaa' })).element
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(2);
    expect(buttons[0].hasAttribute('disabled')).to.be.true;
    expect(buttons[1].hasAttribute('disabled')).to.be.true;
  });

  it('should add a label to the voted entry', () => {
    const component = wrapAndRenderIntoDocument(
      voting(subject({pair: ['aaa', 'bbb'], hasVoted: 'bbb'})).element
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons[0].textContent).not.to.contain('Voted');
    expect(buttons[1].textContent).to.contain('Voted');
  });

  it('should render just the winner when there is one', () => {
    const component = wrapAndRenderIntoDocument(
      voting({winner$: new BehaviorSubject('abc'), pair$: new BehaviorSubject([])}).element
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

    expect(buttons.length).to.equal(0);

    const winner = findRenderedDOMComponentWithTag(component, 'span');
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('abc');
  });
});
