// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

type Action = {type: string};

const _increment: Action = Object.freeze({
  type: "INCREMENT"
});

const _decrement: Action = Object.freeze({
  type: "DECREMENT"
});

function increment(): Action {
  return _increment;
}

function decrement(): Action {
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

type StateProps = {
  value: number,
};

type DispatchProps = {
  onClickIncrement: Function,
  onClickDecrement: Function
};

class Main extends React.Component {
  props: StateProps & DispatchProps;

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

function mapStateToProps(state: number): StateProps {
  return {
    value: state
  };
}

function mapDispatchToProps(dispatch: Function): DispatchProps {
  return {
    onClickIncrement: () => dispatch(increment()),
    onClickDecrement: () => dispatch(decrement())
  };
}

const MainContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Main);

const provider = <Provider store={ createStore(counter) }>
  <MainContainer />
</Provider>;

export default provider;

function inject(body: Object) {
  let node = document.getElementById("react-root");
  if (node === null) {
    node = document.createElement("div");
    node.id = "react-root";
    body.appendChild(node);
  }
  ReactDOM.render(provider, node);
}

if (typeof document !== "undefined") {
  if (document.body !== null) {
    inject(document.body);
  }
}
