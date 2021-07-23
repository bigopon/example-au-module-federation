const { AureliaPlugin } = require('aurelia-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

/**
 * @returns {import('webpack').Configuration}
 */
module.exports = ({ mode = 'development' }) => ({
  entry: {
    app: ['aurelia-bootstrapper']
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['src', 'node_modules']
  },
  mode,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3003
  },
  module: {
    rules: [
      { test: /\.html$/i, loader: 'html-loader' },
      { test: /\.ts$/, loader: "ts-loader" },
    ]
  },
  plugins: [
    new AureliaPlugin({

    }),
    // To learn more about the usage of this plugin, please visit https://webpack.js.org/plugins/module-federation-plugin/
    new ModuleFederationPlugin({
      name: "app1",
      remotes: {
        app2: "app2@http://localhost:8080/remoteEntry.js",
      },
      // shared: {react: {singleton: true}, "react-dom": {singleton: true}},
    }),
    new HtmlWebpackPlugin({
      template: 'index.ejs'
    })
  ]
});
