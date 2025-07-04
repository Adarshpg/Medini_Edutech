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

// Initialize Socket.IO with CORS and path
const io = socketIo(httpServer, {
  cors: {
    origin: [
      'http://localhost:5177',
      'http://localhost:5173',
      'https://mediniedutech.com',
      'https://medini-edutech-rho.vercel.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true
  },
  path: '/socket.io/'  // Match the path we're using in the frontend
});

// Make io available globally for other modules
global.io = io;

let server = null; // Initialize server as null

// Request logging
app.use(morgan('dev'));

// CORS configuration
const allowedOrigins = [
  'http://localhost:5177',
  'http://localhost:5173',
  'https://medini-edutech-9qbb.onrender.com',
  'https://mediniedutech.com',
  'https://www.mediniedutech.com',
  'https://medini-edutech-rho.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Request origin:', origin);
    
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'X-Requested-With'
  ],
  exposedHeaders: [
    'Content-Length',
    'X-Foo',
    'X-Bar',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Credentials'
  ],
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  preflightContinue: false,
  maxAge: 86400 // 24 hours
};

// Enable CORS pre-flight
app.options('*', cors(corsOptions)); // Enable pre-flight for all routes

// Apply CORS to all routes
app.use((req, res, next) => {
  // Log all incoming requests
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  console.log('Request headers:', req.headers);
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling preflight request');
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Max-Age', '86400'); // 24 hours
    return res.status(200).end();
  }
  
  // For non-OPTIONS requests, use the CORS middleware
  cors(corsOptions)(req, res, next);
});

// Middleware
app.use(express.json({ limit: '10kb' }));
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

// Update MongoDB connection in simple-server.js
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI ,{
      // Remove deprecated options
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host} on uri ${process.env.MONGO_URI}`);
  } catch (err) {
    console.error(`MongoDB Connection Error: ${err.message}`);
    process.exit(1);
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
    await connectDB();

    // Configure CORS for Socket.IO
    const allowedOrigins = [
      'http://localhost:5177',
      'http://localhost:5173',
      'https://medini-edutech-9qbb.onrender.com',
      'https://mediniedutech.com',
      'https://www.mediniedutech.com',
      'https://medini-edutech-rho.vercel.app'
    ];

    const ioOptions = {
      cors: {
        origin: function(origin, callback) {
          console.log('WebSocket connection origin:', origin);
          
          // Allow requests with no origin (like mobile apps or curl requests)
          if (!origin) return callback(null, true);
          
          if (allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            console.warn('WebSocket connection blocked by CORS:', origin);
            callback(new Error('Not allowed by CORS'));
          }
        },
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: [
          'Content-Type',
          'Authorization',
          'X-Requested-With',
          'Accept',
          'Origin',
          'Access-Control-Allow-Headers',
          'Access-Control-Allow-Origin'
        ],
        credentials: true,
        optionsSuccessStatus: 200 // Some legacy browsers choke on 204
      },
      path: '/socket.io/',
      serveClient: false,
      pingTimeout: 60000,
      pingInterval: 25000,
      cookie: false,
      // Enable compatibility mode
      allowEIO3: true,
      // Enable HTTP long-polling as fallback
      transports: ['websocket', 'polling'],
      // Increase the maximum allowed event listeners
      maxHttpBufferSize: 1e8,
      // Add connection state recovery
      connectionStateRecovery: {
        // The backup duration of the sessions and the packets
        maxDisconnectionDuration: 2 * 60 * 1000,
        // Whether to skip middlewares upon successful recovery
        skipMiddlewares: true,
      }
    };

    // Initialize Socket.IO
    io = socketIo(httpServer, ioOptions);
    
    // Log all socket events
    io.use((socket, next) => {
      console.log('Socket connection attempt:', socket.handshake);
      next();
    });

    // Make io accessible globally for event emission
    global.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id);
      socket.on('disconnect', () => console.log('Client disconnected:', socket.id));
    });

    // MongoDB Change Stream for real-time internship registrations
    mongoose.connection.once('open', async () => {
      console.log('MongoDB connected, setting up change stream...');
      try {
        const collection = mongoose.connection.collection('internships');
        const changeStream = collection.watch();
        
        changeStream.on('change', (change) => {
          console.log('Change detected in internships collection:', change.operationType);
          if (change.operationType === 'insert') {
            console.log('New internship registration:', change.fullDocument);
            io.emit('internshipRegistered', change.fullDocument);
          }
        });
        
        console.log('Change stream initialized on internships collection');
      } catch (error) {
        console.error('Error setting up change stream:', error);
      }
    });

    server = httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`
        Server running in ${process.env.NODE_ENV || 'development'} mode
        Listening on port ${PORT}
        MongoDB: ${process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medini_edutech'}
        CORS enabled for development
        Socket.IO enabled
      `);
    });

    // Handle unhandled rejections
    process.on('unhandledRejection', (err) => {
      console.error('UNHANDLED REJECTION! 💥', err.name, err.message);
      console.error(err.stack);
      gracefulShutdown();
    });

  } catch (error) {
    console.error('Failed to start server:', error);
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