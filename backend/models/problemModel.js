const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    difficulty: {
      type: String,
      required: [true, 'Please add difficulty level'],
      enum: ['Easy', 'Medium', 'Hard', 'Expert'],
      default: 'Easy',
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
      enum: ['JavaScript', 'React', 'Node.js', 'Next.js', 'MongoDB'],
    },
    starterCode: {
      type: String,
      required: [true, 'Please add starter code'],
    },
    testCases: [
      {
        input: {
          type: String,
          required: true,
        },
        output: {
          type: String,
          required: true,
        },
      },
    ],
    solution: {
      type: String,
      required: [true, 'Please add a solution'],
    },
    points: {
      type: Number,
      required: [true, 'Please add points value'],
      default: 10,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Problem', problemSchema); 