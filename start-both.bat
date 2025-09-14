@echo off
echo Starting Todo App...

echo Starting server...
start "Server" cmd /k "cd /d c:\Users\pappu\OneDrive\Desktop\todoapp\server && npm start"

timeout /t 5 /nobreak

echo Starting client...
start "Client" cmd /k "cd /d c:\Users\pappu\OneDrive\Desktop\todoapp\client && npm start"

echo Both server and client are starting...
echo Server should be running on http://localhost:8000
echo Client should be running on http://localhost:3000
pause
