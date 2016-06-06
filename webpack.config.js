const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const root = path.join(__dirname, "./");
const webpack = require("webpack");

module.exports = [{
  entry: {
    bundle: path.join(root, "assets/javascripts/application.ts")
  },
  output: {
    path: path.join(root, "source/assets/js"),
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        loader: "babel-loader?presets[]=es2015!ts-loader",
        exclude: /node_modules/,
        test: /\.ts$/,
      },
      {
        loader: "babel-loader?presets[]=es2015",
        test: /\.js$/
      }
    ]
  },
  resolve: {
    extensions: ["", ".js"]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
}, {
  entry: {
    bundle: [
      path.join(root, "node_modules/normalize.css/normalize.css"),
      path.join(root, "assets/stylesheets/application.scss"),
      path.join(root, "assets/stylesheets/application.js")
    ]
  },
  output: {
    path: path.join(root, "source/assets/css"),
    filename: "[name].css"
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader?minimize!sass-loader")
      },
      {
        test: /\.jpg$/,
        loader: "url-loader?mimetype=image/jpg"
      }
    ]
  },
  plugins: [
        new ExtractTextPlugin("[name].css")
    ]
}];

