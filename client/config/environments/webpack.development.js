/* global require, module */
/**
 * Config file for development
 */

var webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlPlugin = require('html-webpack-plugin');

function buildConfig(paths) {
  return {
    config: {
      entry: [
        paths.src + '/app.jsx'
      ],
      debug: true,
      target: 'web',
      externals: [],
      // These parameters improve the rebuild time
      devtool: 'eval-source-map',
      cache: true,
      // It suppress error shown in console, so it has to be set to false.
      devServer: {
        contentBase: './dist',
        quiet: false,
        // It suppress everything except error, so it has to be set to false as well
        // to see success build.
        noInfo: false,
        stats: {
          // Config for minimal console.log mess.
          assets: false,
          colors: true,
          version: false,
          hash: true,
          timings: true,
          chunks: true,
          chunkModules: false
        }
      }
    },
    // Output file
    filename: '[name].js',
    // Combine plugins with the base
    plugins: [
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('[name].css', {
        allChunks: true
      }),
      new HtmlPlugin({
        template: 'templates/index.development.ejs', // Load a custom template
        inject: 'body', // Inject all scripts into the body
        minify: false
      })
    ]
  }
}

// Export the funciton to build the config.
module.exports = buildConfig;
