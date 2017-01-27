
import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
  render() {
    return <div>Hello World</div>;
  }
}

function render() {
  ReactDOM.render(
    <Main />,
    root);
}

const root = document.createElement("div");
document.body.appendChild(root);

render();
