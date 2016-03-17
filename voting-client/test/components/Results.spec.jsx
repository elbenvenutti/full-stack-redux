'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {renderIntoDocument, findRenderedDOMComponentWithTag, scryRenderedDOMComponentsWithTag, Simulate} from 'react-addons-test-utils';
import {results} from '../../src/components/Results';
import {expect} from 'chai';
import {BehaviorSubject} from 'rx';

describe('Results', () => {
  it('should notify when next button is clicked', () => {
    let clicked = false;

    const {element, events} = results(new BehaviorSubject({}));
    events.next$.subscribe(() => clicked = true);
    const component = renderIntoDocument(element);

    Simulate.click(findRenderedDOMComponentWithTag(component, 'button'));

    expect(clicked).to.be.true;
  });

  it('should render the winner when there is one', () => {
    const component = renderIntoDocument(
      results(new BehaviorSubject({winner: 'abc'})).element
    );

    const winner = findRenderedDOMComponentWithTag(component, 'span');
    expect(winner).to.be.ok;
    expect(winner.textContent).to.contain('abc');
  });
});

