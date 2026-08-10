import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth.slice.js";
import resumeReducer from "../features/resume/state/resume.slice.js";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        resume: resumeReducer
    }
})