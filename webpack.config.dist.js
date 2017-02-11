
module.exports = {
  context: __dirname,
  entry: {
    "increment": "./src/increment.js",
    "hello": "./src/hello.js",
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    libraryTarget: "commonjs2",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
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
