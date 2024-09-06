import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosHttp from "../../utils/axiosClient";

const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }) => {
        try{
            const response = await axiosHttp.post(`login`, { email, password });
            localStorage.setItem('token', response.data.token);
            
            return response.data;
        }catch(error){
            console.log(error);
            
            throw (error.response?.data).message;
        }
    }
)

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ username, email, password }) => {
        try{
            const response = await axiosHttp.post(`register`, { username, email, password });
            return response.data;
        }catch(error){
            throw (error.response?.data).message;
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.token = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = action.error.message;
            })
            .addCase(loginUser.pending, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = null;
            })

            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = action.error.message;
            })
            .addCase(registerUser.pending, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = null;
            })
    },
});

export const { logout, initialize } = authSlice.actions;
export default authSlice.reducer