#!/bin/bash
set -o errexit

npm run -s transpile
npm run -s scrape
npm run -s make-fortune
npm run -s install-fortune
