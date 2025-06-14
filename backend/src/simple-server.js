const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const morgan = require('morgan');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Initialize express
const app = express();
let server = null; // Initialize server as null

// Request logging
app.use(morgan('dev'));

// CORS configuration
const corsOptions = {
  origin: [
    // 'https://medini-edutech-rho.vercel.app/',
    // "https://medini-edutech-rho.vercel.app",/
    "https://mediniedutech.com",
    // 'http://localhost:5173',
    // 'http://127.0.0.1:5173',
    // 'http://localhost:5177',
    // 'http://127.0.0.1:5177',
    // 'http://localhost:5180',
    // 'http://127.0.0.1:5180'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

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

app.use('/api/auth', authRoutes);
app.use('/api/internships', internshipRoutes);

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
    
    // Don't send the entire document back
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
    
    server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`
        Server running in ${process.env.NODE_ENV || 'development'} mode
        Listening on port ${PORT}
        MongoDB: ${process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medini_edutech'}
        CORS enabled for development
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