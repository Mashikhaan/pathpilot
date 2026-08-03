import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: true,
        error: null
    },
    reducers:{
        setUser: (state, action) => {
    console.log("SET USER RUN:", action.payload);
    state.user = action.payload;
},
        setLoading: (state, action) =>{
            state.loading = action.payload
        },
        setError: (state, action) =>{
            state.error = action.payload
        }
    }
})

export const { setUser, setLoading, setError } = authSlice.actions
export default authSlice.reducer