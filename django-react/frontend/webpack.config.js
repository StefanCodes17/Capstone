const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
 template: "./templates/frontend/index.html",
 filename: "./index.html"
});
const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');


module.exports = (env, argv) => {
  const mode = argv.mode || 'development'; // dev mode by default

  return{
    mode: mode,
    stats:{
      children: true
    },
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, './static/frontend'),
      filename: '[name].js',
    },
      module: {
        rules: [
          {
          test: /\.js$/,
          include: path.resolve(__dirname, 'src'),
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env'],
            }
          }
        },
        {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'src'),
          use: ['style-loader', 'css-loader', 'postcss-loader'],
        }
      ]
    },
    optimization: {
      minimize: true
    },
    devServer: {
      historyApiFallback: true,
      hot: true
    },
    plugins: [
      htmlPlugin,
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      new Dotenv(),
      ]
    }
  };