import { createSlice } from '@reduxjs/toolkit'

export const resumeSlice = createSlice({
    name: "resume",
    initialState: {
        resume: null,
        loading: true,
        error: null
    },
    reducers: {
        setResume: (state, action) => {
            state.resume = action.payload
        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        }
    }
})

export const { setResume, setLoading, setError } = resumeSlice.actions
export default resumeSlice.reducer 