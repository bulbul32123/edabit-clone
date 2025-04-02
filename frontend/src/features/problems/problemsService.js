import axios from 'axios';

const API_URL = 'http://localhost:5000/api/problems/';

// Get all problems
const getProblems = async (filters = {}) => {
    const { category, difficulty } = filters;
    let url = API_URL;

    if (category || difficulty) {
        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (difficulty) params.append('difficulty', difficulty);
        url += `?${params.toString()}`;
    }

    const response = await axios.get(url);
    return response.data;
};

// Get single problem
const getProblem = async (id) => {
    const response = await axios.get(API_URL + id);
    return response.data;
};

// Create problem (admin only)
const createProblem = async (problemData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, problemData, config);
    return response.data;
};

// Update problem (admin only)
const updateProblem = async (id, problemData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + id, problemData, config);
    return response.data;
};

// Delete problem (admin only)
const deleteProblem = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + id, config);
    return response.data;
};

const problemsService = {
    getProblems,
    getProblem,
    createProblem,
    updateProblem,
    deleteProblem,
};

export default problemsService; 