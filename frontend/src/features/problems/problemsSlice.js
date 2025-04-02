import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import problemsService from './problemsService';

const initialState = {
    problems: [],
    problem: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
};

// Get all problems
export const getProblems = createAsyncThunk(
    'problems/getAll',
    async (filters, thunkAPI) => {
        try {
            return await problemsService.getProblems(filters);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get single problem
export const getProblem = createAsyncThunk(
    'problems/getSingle',
    async (id, thunkAPI) => {
        try {
            return await problemsService.getProblem(id);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Create new problem (admin only)
export const createProblem = createAsyncThunk(
    'problems/create',
    async (problemData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await problemsService.createProblem(problemData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update problem (admin only)
export const updateProblem = createAsyncThunk(
    'problems/update',
    async ({ id, problemData }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await problemsService.updateProblem(id, problemData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete problem (admin only)
export const deleteProblem = createAsyncThunk(
    'problems/delete',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await problemsService.deleteProblem(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const problemsSlice = createSlice({
    name: 'problems',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = '';
        },
        clearProblem: (state) => {
            state.problem = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProblems.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProblems.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.problems = action.payload;
            })
            .addCase(getProblems.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getProblem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProblem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.problem = action.payload;
            })
            .addCase(getProblem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(createProblem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createProblem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.problems.push(action.payload);
            })
            .addCase(createProblem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateProblem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateProblem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.problems = state.problems.map((problem) =>
                    problem._id === action.payload._id ? action.payload : problem
                );
            })
            .addCase(updateProblem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteProblem.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProblem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.problems = state.problems.filter(
                    (problem) => problem._id !== action.payload.id
                );
            })
            .addCase(deleteProblem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    },
});

export const { reset, clearProblem } = problemsSlice.actions;
export default problemsSlice.reducer; 