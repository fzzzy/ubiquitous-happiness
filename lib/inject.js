

import ReactDOM from 'react-dom';


function inject(provider) {
  if (typeof document !== "undefined") {
    if (document.body !== null) {
      let node = document.getElementById("react-root");
      if (node === null) {
        node = document.createElement("div");
        node.id = "react-root";
        document.body.appendChild(node);
      }
      ReactDOM.render(provider, node);
    }
  }
}

export default inject;
