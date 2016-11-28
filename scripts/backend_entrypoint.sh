#!/bin/bash

# Wait for the database
wait_for_db() {
  counter=0
  echo "Connecting to posrgress"
  while ! nc -z db 5432; do
    counter=$((counter+1))
    if [ $counter == 30 ]; then
      echo "Error: Couldn't connect to Postgres."
      exit 1
    fi
    echo "Trying to connect to Postgres at $postgres_address. Attempt $counter."
    sleep 5
  done
}

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
  echo -e "\nRunning migrations"
  bin/rake db:migrate
  touch ./tmp/db.sem
fi

# Run!
echo -e "\nRunning server"
exec "$@"
