const { body, validationResult } = require('express-validator');

exports.validateInternshipRegistration = [
  // Validate and sanitize fields
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please include a valid email')
    .normalizeEmail(),
    
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Please include a valid phone number'),
    
  body('program')
    .isIn(['IT', 'Civil', 'Mechanical', 'Other']).withMessage('Please select a valid program'),
    
  body('course')
    .notEmpty().withMessage('Course is required')
    .isLength({ min: 2, max: 100 }).withMessage('Course must be between 2 and 100 characters'),
    
  body('qualification')
    .notEmpty().withMessage('Qualification is required')
    .isLength({ min: 2, max: 100 }).withMessage('Qualification must be between 2 and 100 characters'),
    
  body('college')
    .notEmpty().withMessage('College name is required')
    .isLength({ min: 2, max: 200 }).withMessage('College name must be between 2 and 200 characters'),
    
  body('graduationYear')
    .notEmpty().withMessage('Graduation year is required')
    .isNumeric().withMessage('Year must be a number')
    .isLength({ min: 4, max: 4 }).withMessage('Please enter a valid 4-digit year'),
    
  body('message')
    .optional({ checkFalsy: true })
    .isLength({ max: 500 }).withMessage('Message cannot be longer than 500 characters'),
    
  // Check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    next();
  }
];
