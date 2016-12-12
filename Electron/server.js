/* tslint:disable */
var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var childProcess = require("child_process");
var config = require("./webpack.config.js");
var compiler = webpack(config);

const argv = require("minimist")(process.argv.slice(2));

var server = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  hot: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
});
server.listen(8080, "localhost", (serverError) => {
  if (serverError) {
    return console.error(serverError);
  }

  if (argv.start) {
    childProcess.spawn("yarn", ["start"], {shell: true, env: process.env, stdio: "inherit"})
      .on("close", node => process.exit(node))
      .on("error", spawnError => console.error(spawnError));
  }

  console.log("Listening on http://localhost:8080");
});
