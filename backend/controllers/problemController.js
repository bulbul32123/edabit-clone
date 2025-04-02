const Problem = require('../models/problemModel');

// @desc    Get all problems
// @route   GET /api/problems
// @access  Public
const getProblems = async (req, res) => {
    try {
        const { category, difficulty } = req.query;
        const filter = {};

        if (category) {
            filter.category = category;
        }

        if (difficulty) {
            filter.difficulty = difficulty;
        }

        const problems = await Problem.find(filter).select('-solution -testCases');
        res.json(problems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get single problem
// @route   GET /api/problems/:id
// @access  Public
const getProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id).select('-solution');

        if (problem) {
            res.json(problem);
        } else {
            res.status(404).json({ message: 'Problem not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Create a problem
// @route   POST /api/problems
// @access  Private/Admin
const createProblem = async (req, res) => {
    try {
        const {
            title,
            description,
            difficulty,
            category,
            starterCode,
            testCases,
            solution,
            points,
        } = req.body;

        const problem = await Problem.create({
            title,
            description,
            difficulty,
            category,
            starterCode,
            testCases,
            solution,
            points,
            createdBy: req.user._id,
        });

        res.status(201).json(problem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Update a problem
// @route   PUT /api/problems/:id
// @access  Private/Admin
const updateProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);

        if (problem) {
            problem.title = req.body.title || problem.title;
            problem.description = req.body.description || problem.description;
            problem.difficulty = req.body.difficulty || problem.difficulty;
            problem.category = req.body.category || problem.category;
            problem.starterCode = req.body.starterCode || problem.starterCode;
            problem.testCases = req.body.testCases || problem.testCases;
            problem.solution = req.body.solution || problem.solution;
            problem.points = req.body.points || problem.points;

            const updatedProblem = await problem.save();
            res.json(updatedProblem);
        } else {
            res.status(404).json({ message: 'Problem not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Delete a problem
// @route   DELETE /api/problems/:id
// @access  Private/Admin
const deleteProblem = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);

        if (problem) {
            await problem.deleteOne();
            res.json({ message: 'Problem removed' });
        } else {
            res.status(404).json({ message: 'Problem not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    getProblems,
    getProblem,
    createProblem,
    updateProblem,
    deleteProblem,
}; 