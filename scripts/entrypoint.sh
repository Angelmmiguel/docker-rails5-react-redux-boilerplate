#!/bin/bash

# Clean environment
echo -e "\nCleaning environment"
rm tmp/pids/server.pid # TODO: Move this pid to the /tmp folder of the container

# Install dependencies
echo -e "\nChecking gems"
bundle install --quiet

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
