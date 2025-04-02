import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import problemsReducer from '../features/problems/problemsSlice';
import submissionsReducer from '../features/submissions/submissionsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    problems: problemsReducer,
    submissions: submissionsReducer,
  },
}); 