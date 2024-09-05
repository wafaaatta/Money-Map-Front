import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import ApiError from "../../ApiError";
import { apiUrl } from "../../constants/app_constants";
import axiosHttp from "../../utils/axiosClient";

const initialState = {
    transactions: [],
    loading: false,
    error: null
};

export const getTransactions = createAsyncThunk(
    'transactions/getTransactions',
    async () => {
        try{
            const response = await axiosHttp.get(`transactions`);
            return response.data;
        }catch(error){
            throw ApiError.from(error);
        }
    }
)

export const createTransaction = createAsyncThunk(
    'transactions/createTransaction',
    async ({ type, amount, description }) => {
        try{
            const response = await axiosHttp.post(`transactions`, {
                type,
                amount,
                description
            });
            return response.data;
        }catch(error){
            throw ApiError.from(error);
        }
    }
)


const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTransactions.fulfilled, (state, action) => {
                state.transactions = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(getTransactions.rejected, (state, action) => {
                state.transactions = [];
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(getTransactions.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(createTransaction.fulfilled, (state, action) => {
                state.transactions = [...state.transactions, action.payload];
                state.loading = false;
                state.error = null;
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

    },
});


export default transactionsSlice.reducer;