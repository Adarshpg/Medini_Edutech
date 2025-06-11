const express = require('express');
const router = express.Router();
const { 
  registerForInternship, 
  getInternships, 
  updateStatus 
} = require('../controllers/internshipController');
const { validateInternshipRegistration } = require('../middleware/validation');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.post('/register', validateInternshipRegistration, registerForInternship);

// Protected Admin routes
router.get('/', protect, authorize('admin'), getInternships);
router.put('/:id/status', protect, authorize('admin'), updateStatus);

module.exports = router;
