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
router.get('/', (req, res, next) => {
  console.log('GET /api/internships endpoint hit');
  console.log('Request headers:', req.headers);
  next();
}, getInternships);
router.put('/:id/status', protect, authorize('admin'), updateStatus);

// Get stats: count by program for internships
router.get('/stats', (req, res, next) => {
  console.log('GET /api/internships/stats endpoint hit');
  console.log('Request headers:', req.headers);
  next();
}, async (req, res) => {
  try {
    console.log('Fetching internship statistics...');
    const Internship = require('../models/Internship');
    
    // Get stats grouped by program
    const stats = await Internship.aggregate([
      { 
        $group: { 
          _id: '$program', 
          count: { $sum: 1 },
          // Include sample of latest registrations
          latest: { $push: { 
            id: '$_id',
            name: '$fullName',
            program: '$program',
            createdAt: '$createdAt'
          }}
        } 
      },
      // Sort by count descending
      { $sort: { count: -1 } },
      // Limit to top 10 programs
      { $limit: 10 },
      // Project to format the output
      {
        $project: {
          _id: 1,
          count: 1,
          latest: { $slice: ['$latest', 5] } // Get latest 5 registrations per program
        }
      }
    ]);

    console.log('Stats aggregation result:', JSON.stringify(stats, null, 2));
    
    // Calculate total registrations
    const total = stats.reduce((sum, stat) => sum + stat.count, 0);
    
    // Add percentage for each program
    const statsWithPercentage = stats.map(stat => ({
      ...stat,
      percentage: total > 0 ? Math.round((stat.count / total) * 100) : 0
    }));
    
    res.json({
      success: true,
      data: statsWithPercentage,
      total,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error fetching internship stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
