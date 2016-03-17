'use strict';

import React from 'react';
import {dom} from 'react-reactive-class';

const {div: Div, span: Span} = dom;

export default winner$ => ({
  element: <Div>Winner is <Span>{winner$}</Span>!</Div>,
  events: {}
});
