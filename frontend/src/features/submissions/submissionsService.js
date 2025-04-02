import axios from 'axios';

const API_URL = 'http://localhost:5000/api/submissions/';

// Submit a solution
const submitSolution = async (submissionData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, submissionData, config);
  return response.data;
};

// Get user submissions
const getUserSubmissions = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Get submission by ID
const getSubmissionById = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + id, config);
  return response.data;
};

const submissionsService = {
  submitSolution,
  getUserSubmissions,
  getSubmissionById,
};

export default submissionsService; 