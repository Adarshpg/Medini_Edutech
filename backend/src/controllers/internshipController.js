const { validationResult } = require('express-validator');
const Internship = require('../models/Internship');

// @desc    Register for internship
// @route   POST /api/internships/register
// @access  Public
exports.registerForInternship = async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      fullName,
      email,
      phone,
      program,
      course,
      qualification,
      college,
      graduationYear,
      message,
    } = req.body;

    // Check if user already registered with this email
    const existingRegistration = await Internship.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({
        success: false,
        message: 'You have already registered with this email.'
      });
    }

    // Create new registration
    const registration = await Internship.create({
      fullName,
      email,
      phone,
      program,
      course,
      qualification,
      college,
      graduationYear,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! We will contact you soon.',
      data: registration
    });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
};

// @desc    Get all internship registrations (Admin)
// @route   GET /api/internships
// @access  Private/Admin
exports.getInternships = async (req, res) => {
  try {
    const registrations = await Internship.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    console.error('Get Registrations Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching registrations'
    });
  }
};

// @desc    Update internship status (Admin)
// @route   PUT /api/internships/:id/status
// @access  Private/Admin
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const registration = await Internship.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: 'Registration not found'
      });
    }

    res.status(200).json({
      success: true,
      data: registration
    });
  } catch (error) {
    console.error('Update Status Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating status'
    });
  }
};
