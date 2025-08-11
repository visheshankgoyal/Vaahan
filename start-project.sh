#!/bin/bash

echo "Starting VAAHAN Project..."
echo

echo "Starting Backend (Spring Boot)..."
cd vaahan-backend
gnome-terminal --title="VAAHAN Backend" -- bash -c "mvn spring-boot:run; exec bash" &
cd ..

echo
echo "Starting Frontend (React)..."
cd vaahan-frontend
gnome-terminal --title="VAAHAN Frontend" -- bash -c "npm start; exec bash" &
cd ..

echo
echo "VAAHAN Project is starting..."
echo "Backend will be available at: http://localhost:8080"
echo "Frontend will be available at: http://localhost:3000"
echo
echo "Press Ctrl+C to stop all processes..."
wait 