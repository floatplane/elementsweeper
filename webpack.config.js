const path = require('path');

module.exports = {
  context: path.join(__dirname, './'),
  entry: './app/app.jsx',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loaders: ['style-loader', 'css-loader'],
        include: path.join(__dirname, 'app/css'),
      },
      {
        test: /\.jsx?$/,
        loader: 'jsx-loader',
        exclude: /node_modules/,
        include: path.join(__dirname, 'app'),
      },
    ],
  },
};