const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

// Initialize express
const app = express();

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow both localhost and 127.0.0.1
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// Add OPTIONS handler
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/medini_edutech', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Internship Schema & Model
const internshipSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  program: { type: String, required: true },
  course: { type: String, required: true },
  qualification: { type: String, required: true },
  college: { type: String, required: true },
  graduationYear: { type: String, required: true },
  message: String,
  status: { type: String, default: 'Pending' }
}, { timestamps: true });

const Internship = mongoose.model('Internship', internshipSchema);

// Routes
app.post('/api/register', async (req, res) => {
  try {
    console.log('Received registration data:', req.body);
    const internship = await Internship.create(req.body);
    console.log('Saved to database:', internship);
    res.status(201).json({ 
      success: true, 
      data: internship 
    });
  } catch (error) {
    console.error('Error saving to database:', error);
    res.status(400).json({ 
      success: false, 
      error: error.message 
    });
  }
});

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: 'Server error'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  console.log(`CORS enabled for: http://localhost:5173 and http://127.0.0.1:5173`);
});