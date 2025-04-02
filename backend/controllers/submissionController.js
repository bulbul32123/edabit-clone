const Submission = require('../models/submissionModel');
const Problem = require('../models/problemModel');
const User = require('../models/userModel');
const { VM } = require('vm2');  // Note: We'll need to install this package

// @desc    Submit a solution
// @route   POST /api/submissions
// @access  Private
const submitSolution = async (req, res) => {
    try {
        const { problemId, code } = req.body;

        if (!problemId || !code) {
            return res.status(400).json({ message: 'Problem ID and code are required' });
        }

        // Find the problem
        const problem = await Problem.findById(problemId);
        if (!problem) {
            return res.status(404).json({ message: 'Problem not found' });
        }

        let status = 'Pending';
        let executionTime = 0;

        try {
            // Basic evaluation using vm2 for security
            // In a production app, you might want to use a separate service or Docker containers
            const vm = new VM({
                timeout: 1000,
                sandbox: {},
            });

            // Execute user code
            const startTime = Date.now();
            const userFunction = vm.run(`(${code})`);

            // Check against all test cases
            let allTestsPassed = true;

            for (const testCase of problem.testCases) {
                const input = JSON.parse(testCase.input);
                const expectedOutput = JSON.parse(testCase.output);

                let actualOutput;
                if (Array.isArray(input)) {
                    actualOutput = userFunction(...input);
                } else {
                    actualOutput = userFunction(input);
                }

                // Compare outputs
                const outputMatches = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);

                if (!outputMatches) {
                    allTestsPassed = false;
                    break;
                }
            }

            executionTime = Date.now() - startTime;
            status = allTestsPassed ? 'Accepted' : 'Wrong Answer';

            // Update user points and completed problems if solution is correct
            if (status === 'Accepted') {
                const user = await User.findById(req.user._id);

                // Check if user already solved this problem
                if (!user.completedProblems.includes(problemId)) {
                    user.points += problem.points;
                    user.completedProblems.push(problemId);
                    await user.save();
                }
            }

        } catch (error) {
            console.error('Execution error:', error);
            status = 'Error';
        }

        // Create submission
        const submission = await Submission.create({
            user: req.user._id,
            problem: problemId,
            code,
            status,
            executionTime,
            language: 'javascript',
        });

        res.status(201).json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get user submissions
// @route   GET /api/submissions
// @access  Private
const getUserSubmissions = async (req, res) => {
    try {
        const submissions = await Submission.find({ user: req.user._id })
            .populate('problem', 'title difficulty category')
            .sort({ createdAt: -1 });

        res.json(submissions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get submission by id
// @route   GET /api/submissions/:id
// @access  Private
const getSubmissionById = async (req, res) => {
    try {
        const submission = await Submission.findById(req.params.id)
            .populate('problem', 'title description difficulty category');

        // Check if submission exists and belongs to user
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        if (submission.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized' });
        }

        res.json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    submitSolution,
    getUserSubmissions,
    getSubmissionById,
}; 