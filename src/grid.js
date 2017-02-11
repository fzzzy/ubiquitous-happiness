// @flow

import React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import inject from '../lib/inject';

type Action = {
  type: string
};

const FLIP_TILE_TYPE = "FLIP_TILE";

type FlipTileAction = Action & {
  x: number,
  y: number
};

function flip(x: number, y: number): FlipTileAction {
  return {
    type: FLIP_TILE_TYPE,
    x: x,
    y: y
  };
}

const CHANGE_NAME_TYPE = "CHANGE_NAME";

type ChangeNameAction = Action & {
  name: string;
};

function changeName(name: string): ChangeNameAction {
  return {
    type: CHANGE_NAME_TYPE,
    name: name,
  }
}

type Grid = Array<Array<boolean>>;

type GridState = {
  name: string,
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

function grid(state: GridState = { name: "", grid: blankGrid() }, action: Object): GridState {
  if (action.type === FLIP_TILE_TYPE) {
    return {
      name: state.name,
      grid: state.grid.map((xAxis, y) => xAxis.map((val, x) => {
        if (action.x === x && action.y === y) {
          return !val;
        }
        return val;
      }))
    };
  } else if (action.type === CHANGE_NAME_TYPE) {
    return {
      name: action.name,
      grid: state.grid,
    }
  } else {
    return state;
  }
}

type StateProps = {
  name: string,
  grid: Grid,
};

type DispatchProps = {
  onFlipTile: Function,
  onChangeName: Function,
}

class Name extends React.Component {
  props: { onChangeName: Function };
  nameNode: Object;

  onChangeName(e) {
    e.preventDefault();
    this.props.onChangeName(this.nameNode.value);
  }

  render() {
    return <form style={{
      position: "fixed",
      top: "0px",
      left: "0px",
      padding: "0.5em",
    }}>
      <input
        onChange={ this.onChangeName.bind(this) }
        ref={ (el) => { this.nameNode = el; }} />
    </form>;
  }
}

class Download extends React.Component {
  props: StateProps;

  render() {
    return <a style={{
        position: "fixed",
        top: "0px",
        left: "0px",
        right: "0px",
        backgroundColor: "white",
        textAlign: "right",
        padding: "0.5em",
      }}
      download={ `${ this.props.name }.json` }
      href={ `data:application/json,${ JSON.stringify({
        name: this.props.name,
        grid: this.props.grid
      })}` }>
      Download
    </a>;
  }
}

class Main extends React.Component {
  props: StateProps & DispatchProps;
  onChangeName: Function;

  onClick(x, y) {
    this.props.onFlipTile(x, y);
  }

  render() {
    return <div style={{
      paddingTop: "2em"
    }}>
      <Download name={ this.props.name } grid={ this.props.grid } />
      <Name onChangeName={ this.props.onChangeName } />
      <div style={{
        borderLeft: "1px solid black",
        borderTop: "1px solid black",
        height: "512px",
        width: "512px",
        fontSize: "2px",
        lineHeight: "2px",
      }}>{ this.props.grid.map((row, y) => row.map((color, x) => <span
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
      }</div>
    </div>;
  }
}

function mapStateToProps(state: GridState): StateProps {
  return { name: state.name, grid: state.grid };
}

function mapDispatchToProps(dispatch: Function): DispatchProps {
  return {
    onFlipTile: (x, y) => dispatch(flip(x, y)),
    onChangeName: (name) => dispatch(changeName(name))
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
