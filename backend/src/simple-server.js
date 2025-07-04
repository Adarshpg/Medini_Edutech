const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Initialize express
const app = express();
const httpServer = http.createServer(app);
let io = null;
let server = null; // Initialize server as null

// Request logging
app.use(morgan('dev'));

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5177',
    'https://mediniedutech.com',
    'https://medini-edutech-rho.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json({ limit: '10kb' }));

// Serve static files from the React app
const frontendBuildPath = path.join(__dirname, '../../dist');
app.use(express.static(frontendBuildPath, {
  index: 'index.html'
}));

// Redirect root to home page
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Handle direct access to /home
app.get('/home', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});

// Handle client-side routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendBuildPath, 'index.html'));
});
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});

// Import and mount routers
const authRoutes = require('./routes/authRoutes');
const internshipRoutes = require('./routes/internshipRoutes');
const studentRoutes = require('./routes/studentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/students', studentRoutes);

// MongoDB connection
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.error('MongoDB Connection Error:', err.message);
    throw err; // Re-throw to be caught by the caller
  }
};

// Import the Internship model
const Internship = require('./models/Internship');

// Registration endpoint with validation
app.post('/api/register', async (req, res) => {
  try {
    // Required fields
    const requiredFields = ['fullName', 'email', 'phone', 'program', 'qualification', 'college', 'graduationYear'];
    const missingFields = requiredFields.filter(field => !req.body[field] || req.body[field].trim() === '');

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Phone validation (basic 10-digit check)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(req.body.phone)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid 10-digit phone number'
      });
    }

    // Set default for optional fields
    const registrationData = {
      ...req.body,
      course: req.body.course || 'Not Specified',
      message: req.body.message || '',
      status: 'Pending'
    };

    const internship = await Internship.create(registrationData);

    // Emit real-time event for dashboard stats
    if (global.io) {
      global.io.emit('internshipRegistered', internship.toObject());
    }

    const { _id, email, fullName } = internship.toObject();
    
    res.status(201).json({
      success: true,
      data: {
        id: _id,
        email,
        fullName,
        message: 'Registration successful!'
      }
    });

  } catch (error) {
    console.error('Registration error:', {
      error: error.message,
      stack: error.stack,
      body: req.body
    });
    
    // Handle duplicate key error (MongoDB error code 11000)
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: 'This email is already registered.'
      });
    }
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages.join('. ')
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Server error during registration' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    nodeVersion: process.version
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', {
    error: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method
  });

  res.status(500).json({
    success: false,
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
const PORT = process.env.PORT || 5000;

// Handle process termination
const gracefulShutdown = () => {
  console.log('Shutting down server...');
  if (server) {
    server.close(() => {
      console.log('Server closed');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Initialize server
const initializeServer = async () => {
  try {
    console.log('Starting server initialization...');
    
    // Connect to MongoDB
    await connectDB();

    // Initialize Socket.IO
    console.log('Initializing Socket.IO...');
    io = socketIo(httpServer, {
      cors: {
        origin: [
          'http://localhost:5177',
          'https://mediniedutech.com',
          'https://medini-edutech-rho.vercel.app'
        ],
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    // Make io accessible globally for event emission
    global.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
      socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
    });

    // MongoDB Change Stream for real-time student registrations
    mongoose.connection.once('open', () => {
      console.log('Setting up MongoDB change stream...');
      const changeStream = mongoose.connection.collection('students').watch();
      changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
          io.emit('studentRegistered', change.fullDocument);
        }
      });
    });

    // Start the server
    server = httpServer.listen(PORT, '0.0.0.0', () => {
      console.log('\n' + '='.repeat(60));
      console.log(`🚀 Server is running in ${process.env.NODE_ENV || 'development'} mode`);
      console.log(`🌐 Access the app at: http://localhost:${PORT}`);
      console.log(`🔌 MongoDB: ${process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medini_edutech'}`);
      console.log('🔒 CORS enabled for configured origins');
      console.log('🔌 Socket.IO enabled');
      console.log('='.repeat(60) + '\n');
    });

    // Handle server errors
    server.on('error', (error) => {
      if (error.syscall !== 'listen') throw error;
      
      // Handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(`Port ${PORT} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(`Port ${PORT} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });

    // Handle unhandled rejections
    process.on('unhandledRejection', (err) => {
      console.error('\n' + '⚠️ UNHANDLED REJECTION! Shutting down...'.red);
      console.error('Error:', err.name, err.message);
      console.error(err.stack);
      gracefulShutdown();
    });

  } catch (error) {
    console.error('\n❌ Failed to start server:');
    console.error(error);
    process.exit(1);
  }
};

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥', err.name, err.message);
  console.error(err.stack);
  gracefulShutdown();
});

// Start the application
initializeServer();