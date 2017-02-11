// @flow

import React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import inject from '../lib/inject';

type FlipTileAction = {
  type: string,
  x: number,
  y: number
};

const FLIP_TILE_TYPE = "FLIP_TILE";

function flip(x: number, y: number): FlipTileAction {
  return {
    type: FLIP_TILE_TYPE,
    x: x,
    y: y
  };
}

type Grid = Array<Array<boolean>>;

type GridState = {
  grid: Grid
};

function falseArray(): Array<boolean> {
  return [
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
    false, false, false, false, false, false, false, false,
  ];
}

function blankGrid(): Grid {
  return falseArray().map(() => falseArray());
}

function grid(state: GridState = { grid: blankGrid() }, action: FlipTileAction): GridState {
  if (action.type === FLIP_TILE_TYPE) {
    return { grid: state.grid.map((xAxis, y) => xAxis.map((val, x) => {
      if (action.x === x && action.y === y) {
        return !val;
      }
      return val;
    }))};
  } else {
    return state;
  }
}

type StateProps = {
  grid: Grid,
};

type DispatchProps = {
  onFlipTile: Function,
}

class Main extends React.Component {
  props: StateProps & DispatchProps;

  onClick(x, y) {
    this.props.onFlipTile(x, y);
  }

  render() {
    return <div style={{
      borderLeft: "1px solid black",
      borderTop: "1px solid black",
      height: "512px",
      width: "512px",
      fontSize: "2px",
      lineHeight: "2px",

    }}>{
      this.props.grid.map((row, y) => row.map((color, x) => <span
        key={ `${x},${y}` }
        onClick={ this.onClick.bind(this, x, y) }
        style={{
          display: "inline-block",
          height: "16px",
          width: "16px",
          borderBottom: "1px solid black",
          borderRight: "1px solid black",
          boxSizing: "border-box",
          cursor: "pointer",
          backgroundColor: color ? "black" : "white"
        }}>&nbsp;</span>))
    }</div>;
  }
}

function mapStateToProps(state: GridState): StateProps {
  return { grid: state.grid };
}

function mapDispatchToProps(dispatch: Function): DispatchProps {
  return {
    onFlipTile: (x, y) => dispatch(flip(x, y)),
  };
}

const MainContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Main);

const provider = <Provider store={ createStore(grid) }>
  <MainContainer />
</Provider>;

export default provider;

inject(provider);
