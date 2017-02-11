
const fs = require("fs");
const path = require("path");
const ReactDOMServer = require("react-dom/server");

const torender = require("./" + process.argv[2]);
const flattened = ReactDOMServer.renderToString(torender.default);

const basename = path.basename(process.argv[2])
const shortname = basename.slice(0, - path.extname(basename).length);
const outname = `dist/${ shortname }.html`;

fs.writeFile(outname, `<html>
  <head>
    <title>${ shortname }</title>
  </head>
  <body>
    <div id="react-root">${ flattened }</div>
    <script>var module = {};</script>
    <script src="${ basename }"></script>
  </body>
</html>`, function () {
  console.log(outname, "written.");
});
