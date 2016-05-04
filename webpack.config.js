const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const root = path.join(__dirname, "./");

module.exports = [{
  entry: {
    bundle: path.join(root, "front/javascripts/application.ts")
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
        test: /\.js$/,
      }
    ]
  }
}, {
  entry: {
    bundle: [
      path.join(root, "node_modules/normalize.css/normalize.css"),
      path.join(root, "front/stylesheets/application.scss"),
      path.join(root, "front/stylesheets/application.js")
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
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!sass-loader")
      }
    ]
  },
  plugins: [
        new ExtractTextPlugin("[name].css")
    ]
}];

