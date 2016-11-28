/* global require, module */
/**
 * Config file for production
 */

var webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlPlugin = require('html-webpack-plugin'),
  autoprefixer = require('autoprefixer');

function buildConfig(paths) {
  return {
    config: {
      entry: [
        // Required for old browsers.
        'babel-polyfill',
        paths.src + '/main.jsx'
      ],
      debug: false,
      // Increase CSS compatibility
      postcss: [
        autoprefixer({
          browsers: ['last 2 versions']
        })
      ]
    },
    filename: '[name]-[chunkhash].js',
    plugins: [
      // Optimization plugins
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true
        },
        output: {
          comments: false
        }
      }),
      new webpack.optimize.AggressiveMergingPlugin(),
      new ExtractTextPlugin('[name]-[chunkhash].css', {
        allChunks: true
      }),
      // Minify the HTML
      new HtmlPlugin({
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true
        },
        // We are gonna use development because we are not using Typekit in the
        // MVP. It displays some errors in the console.
        template: 'templates/index.development.ejs',
        inject: 'body' // Inject all scripts into the body
      })
    ],
    target: 'web',
    externals: []
  }
}

// Export the funciton to build the config.
module.exports = buildConfig;
