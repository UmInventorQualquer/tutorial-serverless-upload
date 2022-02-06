#!/bin/bash
rm -f uploader.zip
npm i
zip -r uploader.zip index.js node_modules package.json
rm -f package-lock.json
rm -rf node_modules
