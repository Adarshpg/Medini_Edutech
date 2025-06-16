const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
});

// Get stats: count by program
router.get('/stats', async (req, res) => {
  const stats = await Student.aggregate([
    { $group: { _id: '$program', count: { $sum: 1 } } }
  ]);
  res.json(stats);
});

// Register a new student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
