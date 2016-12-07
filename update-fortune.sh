#!/bin/bash
set -o errexit

yarn run transpile
docker start rethinkdb
while ! curl -sf localhost:8080; do 
   sleep 3
done
yarn run scrape
yarn run make-fortune
docker stop rethinkdb
yarn run install-fortune

