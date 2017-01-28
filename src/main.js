
import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';

import store from './store';
import { increment, decrement } from './actions';
import { Main } from './components';

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

ReactDOM.render(
  <Provider store={ store }>
    <MainContainer />
  </Provider>,
  document.body.appendChild(document.createElement("div")));
