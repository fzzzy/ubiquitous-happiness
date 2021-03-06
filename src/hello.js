// @flow

import React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import inject from '../lib/inject';

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

  componentDidMount() {
    this.name.focus();
  }

  submit(e: any) {
    e.preventDefault();
    this.props.onGreet(this.name.value);
  }

  render() {
    return <div>
      { this.props.value
          ? <div>Hello, { this.props.value }</div>
          : <div>
              Enter your name
              <form onSubmit={ this.submit.bind(this) }>
                <input name="name" ref={ (ref) => { this.name = ref; } }/>
                <button>
                  Greet
                </button>
              </form>
            </div> }
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


export default inject(<Provider store={ createStore(hello) }>
  <MainContainer />
</Provider>);
