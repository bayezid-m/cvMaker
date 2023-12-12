import { UserCV } from "../../types/UserCV";
import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


const initialState:{
    userCV: UserCV,
    newCV: UserCV,
    error: string,
    loading: boolean
} = {
    userCV:{
        _id: '',
        email: '',
        image: '',
    },
    newCV:{
        _id: '',
        email: '',
        image: ''
    },
    loading: false,
    error: "",
}

export const addCV = createAsyncThunk(
    'addCV',
    async ({ userData: eduData }: { userData: UserCV }) => {
        try {
            const result = await axios.post<UserCV>("http://localhost:2000/api/v1/user/CV/add", eduData);
            return result.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)
export const getCVByEmail = createAsyncThunk(
    'getCVByEmail',
    async (email: {email: string}) => {
        console.log(email);
        try {
            const response = await axios.post<{ userData: UserCV}>(
                "http://localhost:2000/api/v1/user/CV/email",
                 email
            );      
            return response.data.userData;
          } catch (e) {
            const error = e as AxiosError
            return error
          }
    }
);

export const deleteCVById = createAsyncThunk(
    'deleteCVById',
    async (CVId: string) => {
        try {
            console.log("Deleting CV with ID: ", CVId);
            const result = await axios.delete(`http://localhost:2000/api/v1/user/CV/${CVId}`);
            return result.data; 
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
);

const userCVSlice = createSlice({
    name: "userCVSlice",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
        .addCase(addCV.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message
            } else {
                state.newCV = action.payload
            }
            state.loading = false
        })
        .addCase(getCVByEmail.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message
            } else {
                state.userCV = action.payload
            }
            state.loading = false
        })
        .addCase(deleteCVById.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message
            } else {
                state.userCV = action.payload;
            }
            state.loading = false
        })  
    }
})

const userCVReducer = userCVSlice.reducer
export default userCVReducer