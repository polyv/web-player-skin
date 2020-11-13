const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
const ip = require('address').ip();

const devConfig = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    port: 8070,
    index: 'index.html',
    host: ip,
    // writeToDisk: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
});

module.exports = devConfig;
