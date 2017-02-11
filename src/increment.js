// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

export type Action = {type: string};

const _increment: Action = Object.freeze({
  type: "INCREMENT"
});

const _decrement: Action = Object.freeze({
  type: "DECREMENT"
});

export function increment(): Action {
  return _increment;
}

export function decrement(): Action {
  return _decrement;
}

function counter(state: number = 0, action: Action) {
  if (action.type === increment().type) {
    return state + 1;
  } else if (action.type === decrement().type) {
    return state - 1;
  } else {
    return state;
  }
}

type Props = {
  value: number,
  onClickIncrement: Function,
  onClickDecrement: Function
};

export class Main extends React.Component {
  props: Props;

  render() {
    return <div>
      <div>Current state: { this.props.value }</div>
      <button onClick={ this.props.onClickIncrement }>
        Increment
      </button>
      <button onClick={ this.props.onClickDecrement }>
        Decrement
      </button>
    </div>;
  }
}

export function mapStateToProps(state: number): Object {
  return {
    value: state
  };
}

export function mapDispatchToProps(dispatch: Function): Object {
  return {
    onClickIncrement: () => dispatch(increment()),
    onClickDecrement: () => dispatch(decrement())
  };
}

const MainContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Main);

export function inject(oldNode: any = null): Object {
  let node = null;
  if (oldNode) {
    node = oldNode;
  } else {
    node = document.createElement("div");
    if (document.body !== null) {
      document.body.appendChild(node);
    }
  }

  ReactDOM.render(
    <Provider store={ createStore(counter) }>
      <MainContainer />
    </Provider>,
    node);

  return node;
}

inject();
