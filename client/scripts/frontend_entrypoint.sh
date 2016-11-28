#!/bin/bash

export PATH="/app/node_modules/.bin:$PATH"

echo "Node Version:  $(node -v)"
echo "Node ENV:      $NODE_ENV"
echo "Npm Version:   $(npm -v)"

# Install modules
echo "Installing missing dependencies..."
npm install

# Compile libraries if they are not present
if [ ! -f ./dist/vendor.js ]; then
  echo "Building libraries..."
  npm run build:vendor
fi

exec "$@"
