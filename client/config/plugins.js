/* global require, module, process */
/**
 * Common plugins for all webpack compilation.
 */

var webpack = require('webpack'),
  CopyPlugin = require('copy-webpack-plugin');

function buildConfig(paths, join) {
  // Environments can add more plugins to this array. Check
  // webpack.config.js
  return [
    new CopyPlugin([
      { from: paths.src + '/assets', to: paths.build + '/assets' }
    ]),
    // Make these constants availables in the source code
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    // Prefetch those files before compile the code. This boost the performance
    // because they require a lot of modules.
    // new webpack.PrefetchPlugin(join('./src/stylesheets/base.sass')),
    // Reference DLL libraries in the code. Check config/dll/webpack.dll.js.
    new webpack.DllReferencePlugin({
      context: join('./src'),
      manifest: require(join('./vendor/vendor-manifest.json'))
    })
  ]
}

// Export the funciton to build the config.
module.exports = buildConfig;
