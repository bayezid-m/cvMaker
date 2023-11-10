import { Education } from "../../types/Education";
import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UpdateEducation } from "../../types/UpdateEducation";
import { NewEducation } from "../../types/NewEducation";

const initialState:{
    education: Education,
    educations: Education[],
    newEducation: NewEducation,
    updateEducation: UpdateEducation,
    error: string,
    loading: boolean
}={
    education:{
        _id: '',
        institution: '',
        email: '',
        degree: '',
        gpa: 0,
        starting: '',
        ending: ''
    },
    educations: [],
    loading: false,
    error: "",
    newEducation:{
        institution: '',
        email: '',
        degree: '',
        gpa: 0,
        starting: '',
        ending: ''
    },
    updateEducation:{
        institution: '',
        email: '',
        degree: '',
        gpa: 0,
        starting: '',
        ending: ''
    }
}

export const addEducation = createAsyncThunk(
    'addEducation',
    async ({ userData: eduData }: { userData: NewEducation }) => {
        try {
            const result = await axios.post<NewEducation>("http://localhost:2000/api/v1/user/education/add", eduData);
            return result.data; 
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)
export const getAllEducation = createAsyncThunk(
    'getAllEducation',
    async () => {
        try {
            const authentication = await axios.get<{userData:Education[]}>("http://localhost:2000/api/v1/user/education/all",
                {
                    headers: {
                        'x-access-token': localStorage.getItem('token')
                    }
                }
            )
            return authentication.data.userData      
        }
        catch (e) {
            const error = e as AxiosError
            return error
        }
    }
)
export const getSingleEduById = createAsyncThunk(
    'getSingleEduById',
    async ( eduId: string ) => {
        try {
            console.log("I am here");
            const result = await axios.put<Education>(`http://localhost:2000/api/v1/user/education/${eduId}`);
            return result.data; // The returned result will be inside action.payload
          
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)
export const updateSingleEdu = createAsyncThunk(
    'updateSingleEdu',
    async ({ eduData, eduId }: { eduData: UpdateEducation, eduId: string }) => {
        try {
            const result = await axios.put<NewEducation>(`http://localhost:2000/api/v1/user/education/update/${eduId}`, eduData);
            return result.data; 
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)
export const deleteEducationById = createAsyncThunk(
    'deleteEducationById',
    async (userId: string) => {
      try {
        console.log("Deleting user with ID: ", userId);
        const result = await axios.delete(`http://localhost:2000/api/v1/user/education/${userId}`);
        return result.data; // The returned result will be inside action.payload
      } catch (e) {
        const error = e as AxiosError;
        return error;
      }
    }
  );
const eduSlice = createSlice({
    name: "education",
    initialState,
    reducers: {},
    extraReducers: (build)=>{
        build
            .addCase(addEducation.fulfilled, (state, action)=>{
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.newEducation = action.payload
                }
                state.loading = false
            })
            .addCase(getAllEducation.fulfilled, (state,action)=>{
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.educations = action.payload
                }
                state.loading = false
            })
            .addCase(getSingleEduById.fulfilled, (state,action)=>{
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.education = action.payload
                }
                state.loading = false
            })
            .addCase(updateSingleEdu.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.education = action.payload;
                }
                state.loading = false
            })
            .addCase(deleteEducationById.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.education = action.payload;
                }
                state.loading = false
            })
    }
})
const educationReducer = eduSlice.reducer
export default educationReducer