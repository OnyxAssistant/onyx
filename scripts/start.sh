#!/bin/sh

# Function to handle termination signals
term_handler() {
  echo "Terminating processes..."
  
  # Force kill if processes are still running
  kill -9 "$BACKEND_PID" 2>/dev/null
  kill -9 "$FRONTEND_PID" 2>/dev/null
  
  exit 0
}

# Trap termination signals
trap term_handler SIGTERM SIGINT

# Check if APP_MODE is set to production
if [ "$APP_MODE" = "production" ]; then
    echo "Starting in production mode"
    
    # Start the backend
    node /app/backend/dist/main.js  | sed 's/^/[backend] /'  &
    BACKEND_PID=$!
    
    # Start the frontend    
    node /app/frontend/build/server.js  | sed 's/^/[frontend] /' &
    FRONTEND_PID=$!
else
    echo "Starting in development mode"
    
    # Start the backend in development mode
    cd /app/backend
    yarn dev  | sed 's/^/[backend] /' &
    BACKEND_PID=$!
    
    # Start the frontend in development mode
    cd /app/frontend
    yarn dev  | sed 's/^/[frontend] /' &
    FRONTEND_PID=$!
fi

# Wait for both processes to finish
wait $BACKEND_PID $FRONTEND_PID