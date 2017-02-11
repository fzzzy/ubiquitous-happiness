
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
        }],
      }
    ]
  }
};
