#!/bin/bash

# Clean environment
if [ -f ./tmp/pids/server.pid ]; then
  echo -e "\nCleaning environment"
  rm tmp/pids/server.pid
fi

# Install dependencies
echo -e "\nChecking gems"
bundle install --quiet

# Initialize secrets if the file doesn't exist
. ./scripts/generate_secrets.sh

# Initialize database if it's required
if [ ! -f ./tmp/db.sem ]; then
  echo -e "\nSetup database"
  bin/rake db:setup
  touch ./tmp/db.sem
fi

# Migrations
echo -e "\nRunning migrations"
bin/rake db:migrate

# Run!
echo -e "\nRunning server"
exec "$@"
