@echo off
echo Starting VAAHAN Project...
echo.

echo Starting Backend (Spring Boot)...
cd vaahan-backend
start "VAAHAN Backend" cmd /k "mvn spring-boot:run"
cd ..

echo.
echo Starting Frontend (React)...
cd vaahan-frontend
start "VAAHAN Frontend" cmd /k "npm start"
cd ..

echo.
echo VAAHAN Project is starting...
echo Backend will be available at: http://localhost:8080
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to exit this script...
pause > nul 