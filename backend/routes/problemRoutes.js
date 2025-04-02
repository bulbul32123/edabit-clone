const express = require('express');
const router = express.Router();
const {
  getProblems,
  getProblem,
  createProblem,
  updateProblem,
  deleteProblem,
} = require('../controllers/problemController');
const { protect, admin } = require('../middleware/authMiddleware');

// Get all problems / Create a problem
router.route('/')
  .get(getProblems)
  .post(protect, admin, createProblem);

// Get, update, delete a problem
router.route('/:id')
  .get(getProblem)
  .put(protect, admin, updateProblem)
  .delete(protect, admin, deleteProblem);

module.exports = router; 