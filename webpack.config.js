
const fs = require('fs');
const path = require('path');

const entries = {};

const files = fs.readdirSync("src");
for (const file of files) {
  const noext = file.slice(0, - path.extname(file).length);
  entries[noext] = path.resolve(path.join("src", file));
}

module.exports = {
  context: __dirname,
  entry: entries,
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
  module: {
    rules: [
      {
        test: /src\/.*\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: [
              "babel-preset-react",
              "babel-preset-stage-3"
            ].map(require.resolve),
            plugins: [
              "babel-plugin-transform-flow-strip-types"
            ].map(require.resolve),
          }
        }],
      }
    ]
  }
};
