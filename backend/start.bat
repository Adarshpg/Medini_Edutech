@echo off
set NODE_ENV=development
set PORT=5000
set MONGO_URI=mongodb://localhost:27017/medini_edutech
set JWT_SECRET=your_jwt_secret
set JWT_EXPIRE=30d
set JWT_COOKIE_EXPIRE=30
set FRONTEND_URL=http://localhost:3000

node src/server.js
