'use strict';

import {BehaviorSubject} from 'rx';

export default (initState, observable) => {
  const behavior = new BehaviorSubject(initState);
  observable.subscribe(o => behavior.onNext(o));
  return behavior;
}
