import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { Experience } from "../../types/Experience";

const initialState: {
    experience: Experience,
    experiences: Experience[],
    newExperience: Experience,
    updateExperience: Experience,
    error: string,
    loading: boolean
} = {
    experience:{
        _id: '',
        title: '',
        email: '',
        description: '',
        farm: '',
        starting: '',
        ending: ''
    },
    experiences: [],
    newExperience:{
        title: '',
        email: '',
        description: '',
        farm: '',
        starting: '',
        ending: ''
    },
    updateExperience:{
        title: '',
        email: '',
        description: '',
        farm: '',
        starting: '',
        ending: ''
    },
    loading: false,
    error: ''
}
export const addExperience = createAsyncThunk(
    'addExperience',
    async ({ userData: expData }: { userData: Experience }) => {
        try {
            const result = await axios.post<Experience>("http://localhost:2000/api/v1/user/experience/add", expData);
            return result.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)
export const getAllExperience = createAsyncThunk(
    'getAllExperience',
    async () => {
        try {
            const allexp = await axios.get<{ userData: Experience[] }>("http://localhost:2000/api/v1/user/experience/all",
                {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                }
            )
            return allexp.data.userData
        }
        catch (e) {
            const error = e as AxiosError
            return error
        }
    }
)
export const getSingleExpById = createAsyncThunk(
    'getSingleExpById',
    async (expId: string) => {
        console.log(expId);
        try {
            const result = await axios.get<{ userData: Experience }>(`http://localhost:2000/api/v1/user/experience/${expId}`);
            return result.data.userData; // The returned result will be inside action.payload
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)
export const updateSingleExp = createAsyncThunk(
    'updateSingleExp',
    async ({ expData, expId }: { expData: Experience, expId: string }) => {
        try {
            const result = await axios.put<Experience>(`http://localhost:2000/api/v1/user/experience/update/${expId}`, expData);
            return result.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)
export const deleteExperienceById = createAsyncThunk(
    'deleteExperienceById',
    async (expId: string) => {
        try {
            //console.log("Deleting user with ID: ", eduId);
            const result = await axios.delete(`http://localhost:2000/api/v1/user/experience/${expId}`);
            return result.data; // The returned result will be inside action.payload
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
);

const experienceSlice = createSlice({
    name: "experience",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(addExperience.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.newExperience = action.payload
                }
                state.loading = false
            })
            .addCase(getAllExperience.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.experiences = action.payload
                }
                state.loading = false
            })
            .addCase(getSingleExpById.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.experience = action.payload
                }
                state.loading = false
            })
            .addCase(updateSingleExp.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.experience = action.payload;
                }
                state.loading = false
            })
            .addCase(deleteExperienceById.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.experience = action.payload;
                }
                state.loading = false
            })
    }
})
const experienceReducer = experienceSlice.reducer
export default experienceReducer