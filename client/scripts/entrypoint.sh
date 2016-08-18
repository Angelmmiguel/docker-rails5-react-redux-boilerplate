#!/bin/bash

# Env
echo "Node:   $(node -v)"
echo "ENV:    $NODE_ENV"
echo "NPM:    $(npm -v)"

# Install dependencies
npm install

# Run!
exec "$@"
