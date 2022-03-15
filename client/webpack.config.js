const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
 template: "./src/index.html",
 filename: "./index.html"
});
const path = require('path')

module.exports = {
mode: "development",
entry: './src/index.js',
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.js',
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
devServer: {
  historyApiFallback: true,
},
 plugins: [htmlPlugin]
};