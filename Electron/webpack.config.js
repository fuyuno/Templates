/* tslint:disable */
const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    bundle: [
      "react-hot-loader/patch",
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/only-dev-server",
      path.join(__dirname, "src", "index.tsx")
    ],
    style: [
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/only-dev-server",
      path.join(__dirname, "src", "index.ts")
    ]
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "app"),
    publicPath: "http://localhost:8080/assets/"
  },
  resolve: {
    extensions: ["", ".scss", ".css", ".ts", ".tsx", ".js"]
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: [
          "react-hot-loader/webpack",
          "ts"
        ],
        exclude: /node_modules/
      },
      // styles in react-toolbox
      {
        test: /(\.scss|\.css)$/,
        loader: ExtractTextPlugin.extract("style", "css?modules&importLoaders=1!sass"),
        exclude: /src\/styles/
      },
      // styles in src/styles
      {
        test: /(\.scss|\.css)$/,
        loaders: [
          "style",
          "css?modules",
          "sass"
        ],
        include: /src\/styles/
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development")
    })
  ]
};
