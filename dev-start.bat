@echo off
REM Development Server Startup Script for Windows
REM Run both backend and frontend servers for local development

echo.
echo 🚀 Starting Kimi Agent AI Portfolio - Development Mode
echo.

REM Check if we're in the right directory
if not exist "server" (
  echo ❌ Error: Run this script from the project root directory
  exit /b 1
)
if not exist "app" (
  echo ❌ Error: Run this script from the project root directory
  exit /b 1
)

echo 📦 Installing dependencies...
cd server
call npm install >nul 2>&1
cd ..\app
call npm install >nul 2>&1
cd ..

echo ✅ Dependencies installed
echo.
echo 🔄 Opening new terminals for servers...
echo.

REM Start backend in new window
echo Starting backend server on port 5000 (Terminal 1)...
start "Backend Server" cmd /k "cd server && npm run dev"

REM Start frontend in new window
timeout /t 2 /nobreak >nul
echo Starting frontend on port 5173 (Terminal 2)...
start "Frontend Server" cmd /k "cd app && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ✅ Servers started in new windows!
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 📍 Frontend:  http://localhost:5173
echo 📍 Admin:     http://localhost:5173/#/admin/login  
echo 📍 API:       http://localhost:5000/api
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 📋 Login Credentials:
echo    Email:    admin@ashariftikhar.com
echo    Password: Admin123!
echo.
echo ℹ️  Close the terminal windows to stop the servers
echo.
pause
