
module.exports = {
  context: __dirname,
  entry: {
    "main": "./src/main.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
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
