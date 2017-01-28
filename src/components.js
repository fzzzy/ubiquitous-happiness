
// @flow

import React from 'react';

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
