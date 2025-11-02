#!/bin/bash

# Build script for Render deployment

echo "Building frontend..."
cd frontend
npm install
npm run build

echo "Installing backend dependencies..."
cd ../backend
npm install

echo "Build complete!"

