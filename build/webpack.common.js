const path = require('path');
const StylelintPlugin = require('stylelint-webpack-plugin');

const config = {
  entry: {
    app: path.join(__dirname, '../src', 'index.js')
  },
  output: {
    filename: 'polyvskin.js',
    path: path.join(__dirname, '../dist'),
    libraryTarget: 'umd',
    library: 'PolyvSkin',
    umdNamedDefine: true,
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [path.resolve(__dirname, '../src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          esModule: false,
        },
        exclude: [path.resolve(__dirname, '..', 'node_modules')]
      },
      {
        oneOf: [
          {
            test: /\.scss$/,
            use: [
              {
                loader: 'style-loader'
              },
              {
                loader: 'css-loader'
              },
              {
                loader: 'postcss-loader',
                options: {
                  config: {
                    path: 'postcss.config.js'
                  }
                }
              },
              {
                loader: 'sass-loader'
              }
            ],
            exclude: [path.resolve(__dirname, '..', 'node_modules')]
          },
          {
            test: /\.js$/,
            include: [
              path.resolve(__dirname, '../src')
            ],
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css', '.scss'],
    alias: {
      '@': path.join(__dirname, '../src')
    }
  }
};

module.exports = config;
