import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { apiUrl } from "../../constants/app_constants";
import ApiError from "../../ApiError";
import axiosHttp from "../../utils/axiosClient";
import { checkAuthentication, getAuthenticationToken, saveAuthenticationToken, saveUser } from "../../utils/authentication";

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
            saveAuthenticationToken(response.data.token);
            saveUser(response.data.user);
            
            return response.data;
        }catch(error){
            console.log(error);
            
            throw ApiError.from(error);
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
            throw ApiError.from(error);
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

             // Supprime les données du localStorage
             localStorage.removeItem('user');
             localStorage.removeItem('token');
        },

        initialize: (state) => {
            state.isAuthenticated = checkAuthentication();
            state.user = JSON.parse(localStorage.getItem('user'));
            state.token = getAuthenticationToken();
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