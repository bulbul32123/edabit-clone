const express = require('express');
const router = express.Router();
const {
  submitSolution,
  getUserSubmissions,
  getSubmissionById,
} = require('../controllers/submissionController');
const { protect } = require('../middleware/authMiddleware');

// Submit solution and get user submissions
router.route('/')
  .post(protect, submitSolution)
  .get(protect, getUserSubmissions);

// Get submission by ID
router.route('/:id')
  .get(protect, getSubmissionById);

module.exports = router; 