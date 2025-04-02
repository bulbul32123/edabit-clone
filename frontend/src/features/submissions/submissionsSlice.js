import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import submissionsService from './submissionsService';

const initialState = {
  submissions: [],
  submission: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Submit a solution
export const submitSolution = createAsyncThunk(
  'submissions/submit',
  async (submissionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await submissionsService.submitSolution(submissionData, token);
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

// Get user submissions
export const getUserSubmissions = createAsyncThunk(
  'submissions/getUserSubmissions',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await submissionsService.getUserSubmissions(token);
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

// Get submission by ID
export const getSubmissionById = createAsyncThunk(
  'submissions/getById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await submissionsService.getSubmissionById(id, token);
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

export const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearSubmission: (state) => {
      state.submission = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSolution.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitSolution.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.submission = action.payload;
      })
      .addCase(submitSolution.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserSubmissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserSubmissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.submissions = action.payload;
      })
      .addCase(getUserSubmissions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSubmissionById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubmissionById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.submission = action.payload;
      })
      .addCase(getSubmissionById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearSubmission } = submissionsSlice.actions;
export default submissionsSlice.reducer; 