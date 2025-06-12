const mongoose = require('mongoose');

const internshipSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Please add your full name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add your email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add your phone number']
  },
  program: {
    type: String,
    required: [true, 'Please select a program'],
    enum: ['IT', 'Civil', 'Mechanical', 'Other']
  },
  qualification: {
    type: String,
    required: [true, 'Please add your qualification']
  },
  college: {
    type: String,
    required: [true, 'Please add your college name']
  },
  graduationYear: {
    type: String,
    required: [true, 'Please add your graduation year']
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot be more than 500 characters']
  },
  status: {
    type: String,
    enum: ['Pending', 'Contacted', 'Registered', 'Rejected'],
    default: 'Pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Internship', internshipSchema);
