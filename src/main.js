
import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore } from 'redux';
import store from './store';
import { Main } from './components';
import { increment, decrement } from './actions';

const rootNode = document.body.appendChild(document.createElement("div"));
const state = createStore(store);

function mapStateToProps(state) {
  return {
    value: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClickIncrement: () => {
      dispatch(increment)
    },
    onClickDecrement: () => {
      dispatch(decrement)
    }
  };
}

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

function render() {
  ReactDOM.render(
    <Provider store={ state }>
      <MainContainer />
    </Provider>,
    rootNode);
}

render();

state.subscribe(render);
