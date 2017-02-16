// @flow

import React from 'react';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import inject from '../lib/inject';

const GREET = "GREET";
type GreetAction = { type: string, name: string };

type StateProps = { value: string };
type DispatchProps = { onGreet: Function };

class HelloStore {
  greet(name: string = ""): GreetAction {
    return {
      type: GREET,
      name: name
    };
  }

  store(state: string = "", action: GreetAction): string {
    if (action.type === GREET) {
      return action.name;
    } else {
      return state;
    }
  }

  mapStateToProps(state: string): StateProps {
    return {
      value: state
    };
  }

  mapDispatchToProps(dispatch: Function): DispatchProps {
    return {
      onGreet: (name) => dispatch(this.greet(name)),
    };
  }
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


const hello = new HelloStore();
const MainContainer = connect(
  hello.mapStateToProps.bind(hello), hello.mapDispatchToProps.bind(hello)
)(Main);

export default inject(<Provider store={ createStore(hello.store.bind(hello)) }>
  <MainContainer />
</Provider>);
