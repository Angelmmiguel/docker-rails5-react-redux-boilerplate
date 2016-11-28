/* eslint-env node, require */
/* eslint no-console: ["error", { allow: ["info", "log"] }] */
/* global require, module, __dirname, process, console */

// Imports
var path = require('path'),
  // Bind join to the current path
  join = path.join.bind(path, __dirname),
  // Config to export
  config;

// Environment
var NODE_ENV = process.env.NODE_ENV,
  BUILD_DLL = process.env.BUILD_DLL;

// Basic paths of the application
var PATHS = {
  src: path.join(__dirname, './src'),
  build: path.join(__dirname, './dist'),
  vendor: path.join(__dirname, './vendor')
};

/**
 * Building the configuration!
 * ------------------------------------
 */
if (BUILD_DLL === '1' || BUILD_DLL === 1) {
  console.log('Building: DLL libraries for [' + NODE_ENV + ']');
  // All the configuration for building DLL libraries is in the
  // same file.
  var dllConfig = require(join('./config/dll/webpack.dll.js'));
  config = dllConfig(PATHS, join, NODE_ENV);
} else {
  // Build the main project
  console.log('Building: Main project for [' + NODE_ENV + ']');

  // Common blocks for every environment
  var loaders = require(join('./config/loaders.js')),
    plugins = require(join('./config/plugins.js')),
    aliases = require(join('./config/aliases.js'));

  // Set preferences based on the current environment
  var pref;

  if (NODE_ENV === 'production') {
    pref = require(join('./config/environments/webpack.production.js'))(PATHS);
  } else {
    pref = require(join('./config/environments/webpack.development.js'))(PATHS);
  }

  /**
   * Prepare the configuration!
   */
  config = Object.assign(pref.config, {
    // Base path for requires
    context: PATHS.src,
    // Output of the files
    output: {
      path: PATHS.build,
      // This is copnfigurable based on the environment
      filename: pref.filename,
      publicPath: '/'
    },
    module: {
      loaders: loaders(PATHS, join),
      // Boost performance!
      noParse: pref.noParse || [/path*/, /node-sass/]
    },
    // Apply the plugins based on the environment
    plugins: plugins(PATHS, join).concat(pref.plugins || []),
    // Require these file types without specifying the extension
    resolve: {
      root: path.resolve('./src'),
      extensions: ['', '.js', '.jsx', '.sass'],
      alias: aliases(join)
    },
    // Stats in the console.
    stats: {
      colors: true
    }
  });
}

// This configuration is based on the BUILD_DLL and NODE_ENV
// env variables.
module.exports = config;
