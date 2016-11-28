/* global require, module */
/**
 * Base loaders for webpack. Based on the extension of the file, these loaders
 * process the files.
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function buildConfig(paths, join) {
  // SassLoaders
  var sassLoaders = [
    'css-loader',
    'postcss-loader',
    `sass-loader?indentedSyntax=sass&includePaths[]=${paths.src}`
  ]

  return [
    // JSX source files
    {
      test: /\.(js|jsx)?$/,
      include: [ paths.src ], // Performance
      loader: 'babel-loader',
      query: {
        cacheDirectory: true // Performance
      }
    },
    // Styles
    {
      test: /\.(scss|sass)?$/,
      include: join('src/stylesheets'),
      loader: ExtractTextPlugin.extract('sass-loader', sassLoaders.join('!'))
    }
  ];
}

// Export the funciton to build the config.
module.exports = buildConfig;
