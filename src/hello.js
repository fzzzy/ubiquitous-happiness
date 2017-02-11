// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

type GreetAction = {type: string, name: string};

function greet(name: string = ""): GreetAction {
  return {
    type: "GREET",
    name: name
  };
}

function hello(state: string = "", action: GreetAction) {
  if (action.type === greet().type) {
    return action.name;
  } else {
    return state;
  }
}

type StateProps = {
  value: string,
};

type DispatchProps = {
  onGreet: Function,
}

class Main extends React.Component {
  props: StateProps & DispatchProps;
  name: any;

  constructor(props: StateProps & DispatchProps) {
    super(props);
    this.name = null;
  }

  componentDidMount() {
    this.name.focus();
  }

  submit(e: any) {
    e.preventDefault();
    this.props.onGreet(this.name.value);
    this.name.blur();
  }

  render() {
    return <div>
      { this.props.value
          ? <div>Hello, { this.props.value }</div>
          : <div>Enter your name</div> }

      <form onSubmit={ this.submit.bind(this) }>
        <input name="name" ref={ (ref) => { this.name = ref; } }/>
        <button>
          Greet
        </button>
      </form>
    </div>;
  }
}

function mapStateToProps(state: string): StateProps {
  return {
    value: state
  };
}

function mapDispatchToProps(dispatch: Function): DispatchProps {
  return {
    onGreet: (name) => dispatch(greet(name)),
  };
}

const MainContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Main);

function inject() {
  const node = document.createElement("div");
  if (document.body !== null) {
    document.body.appendChild(node);
  }

  ReactDOM.render(
    <Provider store={ createStore(hello) }>
      <MainContainer />
    </Provider>,
    node);
}

inject();
