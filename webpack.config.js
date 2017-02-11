
module.exports = {
  context: __dirname,
  entry: {
    "increment": "./src/increment.js",
    "hello": "./src/hello.js",
    "grid": "./src/grid.js",
  },
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
