
import React from 'react';

export class Main extends React.Component {
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

Main.propTypes = {
  value: React.PropTypes.number
}
