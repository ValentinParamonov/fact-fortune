#!/bin/bash
set -o errexit

yarn run transpile
yarn run scrape
yarn run make-fortune
yarn run install-fortune
