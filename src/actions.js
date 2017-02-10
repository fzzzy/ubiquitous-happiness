
// @flow
export type Action = {type: string};

const _increment: Action = {
  type: "INCREMENT"
};

Object.freeze(_increment);

const _decrement: Action = {
  type: "DECREMENT"
};

Object.freeze(_decrement);

export function increment(): Action {
  return _increment;
}

export function decrement(): Action {
  return _decrement;
}
