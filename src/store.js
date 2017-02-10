
// @flow

import { createStore } from 'redux';

import { increment, decrement } from './actions';
import type { Action } from './actions';

function counter(state: number = 0, action: Action) {
  if (action.type === increment().type) {
    return state + 1;
  } else if (action.type === decrement().type) {
    return state - 1;
  } else {
    return state;
  }
}

export default createStore(counter);
