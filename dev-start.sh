#!/bin/bash
# Development Server Startup Script
# Run both backend and frontend servers for local development

echo "🚀 Starting Kimi Agent AI Portfolio - Development Mode"
echo ""

# Check if we're in the right directory
if [ ! -d "server" ] || [ ! -d "app" ]; then
  echo "❌ Error: Run this script from the project root directory"
  exit 1
fi

echo "📦 Installing dependencies..."
cd server && npm install > /dev/null 2>&1
cd ../app && npm install > /dev/null 2>&1
cd ..

echo "✅ Dependencies installed"
echo ""
echo "🔄 Starting servers in background..."
echo ""

# Start server in background
echo "📡 Starting backend server on port 5000..."
cd server
npm run dev > backend.log 2>&1 &
SERVER_PID=$!
cd ..

# Wait a moment for server to start
sleep 2

# Start frontend in background  
echo "🎨 Starting frontend on port 5173..."
cd app
npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

sleep 2

echo ""
echo "✅ Servers started!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📍 Frontend:  http://localhost:5173"
echo "📍 Admin:     http://localhost:5173/#/admin/login"
echo "📍 API:       http://localhost:5000/api"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Login Credentials:"
echo "   Email:    admin@ashariftikhar.com"
echo "   Password: Admin123!"
echo ""
echo "📋 View Logs:"
echo "   Backend:  tail -f server/backend.log"
echo "   Frontend: tail -f app/frontend.log"
echo ""
echo "⏹️  To stop servers, press Ctrl+C"
echo ""

# Handle cleanup on exit
trap "kill $SERVER_PID $FRONTEND_PID 2>/dev/null; echo ''; echo '👋 Servers stopped'; exit" INT TERM

# Wait for processes to finish
wait
