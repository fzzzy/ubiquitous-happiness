
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import store from './store';

const rootNode = document.body.appendChild(document.createElement("div"));
const state = createStore(store);

class Main extends React.Component {
  onClickIncrement() {
    state.dispatch({type: "INCREMENT"});
  }

  onClickDecrement() {
    state.dispatch({type: "DECREMENT"});
  }

  render() {
    return <div>
      <div>Current state: { this.props.state }</div>
      <button onClick={ this.onClickIncrement.bind(this) }>
        Increment
      </button>
      <button onClick={ this.onClickDecrement.bind(this) }>
        Decrement
      </button>
    </div>;
  }
}

function render() {
  ReactDOM.render(
    <Main state={ state.getState() }/>,
    rootNode);
}

render();

state.subscribe(render);
