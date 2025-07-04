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

// Public route: dashboard needs to fetch all registrations
router.get('/', getInternships);
router.put('/:id/status', protect, authorize('admin'), updateStatus);

// Get stats: count by program for internships
router.get('/stats', async (req, res) => {
  const Internship = require('../models/Internship');
  const stats = await Internship.aggregate([
    { $group: { _id: '$program', count: { $sum: 1 } } }
  ]);
  res.json(stats);
});

module.exports = router;
