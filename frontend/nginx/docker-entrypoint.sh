#!/bin/sh

# Replace placeholder in env.js with actual environment variable value
echo "window.env = { VITE_REACT_APP_API_URL: \"${VITE_REACT_APP_API_URL}\" };" > /usr/share/nginx/html/env.js

# Start nginx
exec "$@"