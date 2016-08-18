var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, './src'),
  entry: {
    jsx: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      'whatwg-fetch',
      './app.jsx'
    ],
    vendor: ['react']
  },
  output: {
    path: path.join(__dirname, '../app/assets/javascripts'),
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(scss|sass)$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /static\/images\/\.(png)$/,
        loader: "url-loader?name=/static/images/$1"
      }
    ],
    noParse: ["react"]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      'fetch': 'whatwg-fetch'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new HtmlWebpackPlugin({
      title: 'React Boilerplate',
      template: "index.html",
      filename: "/app/public/index.html",
      minify: false
    })
  ],
  devServer: {
    hot: true,
    inline: false,
    watchOptions: {
      aggregateTimeout: 250,
      poll: 50
    },
    watch: true,
    noInfo: true,
    noCredentials: true
  },
  devtool: 'source-map',
  watchOptions: {
    poll: 1000
  }
}
