
import { increment, decrement } from './actions';

export default function counter(state = 0, action) {
  if (action.type === increment.type) {
    return state + 1;
  } else if (action.type === decrement.type) {
    return state - 1;
  } else {
    return state;
  }
}
