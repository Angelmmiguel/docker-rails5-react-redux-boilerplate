/* global require, module */

// Imports
var webpack = require('webpack');

/**
 * This file build the libraries of the project. This config will create
 * a static file with required modules in build folder. We only need this step
 * once, so this approach improves the build/rebuild time of the application.
 *
 * The libraries to include here are references in vendor/vendor.js.
 */
function buildConfig(paths, join, env) {
  var plugins = [
    new webpack.DllPlugin({
      // We will use this manifest in plugins.js
      path: join('vendor', '[name]-manifest.json'),
      name: '[name]',
      context: join('vendor')
    })
  ];

  if(env === 'production') {
    // Add optimization for production
    plugins = plugins.concat([
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
      new webpack.optimize.AggressiveMergingPlugin()
    ]);
  }

  return {
    entry: {
      vendor: [ join('vendor', 'vendor.js') ]
    },
    output: {
      path: join('dist'),
      filename: '[name].js',
      library: '[name]'
    },
    plugins: plugins,
    resolve: {
      root: paths.vendor,
      modulesDirectories: ['node_modules']
    },
    stats: {
      colors: true
    }
  }
}

// Export the funciton to build the config.
module.exports = buildConfig;
