import {Project} from "../../types/Project";
import axios, { AxiosError } from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NewProject } from "../../types/NewProject";

const initialState: {
    project: Project,
    projects: Project[],
    userProject: Project[],
    newPorject: NewProject,
    error: string,
    loading: boolean
} = {
    project:{
        _id: '',
        email: '',
        name: '',
        description: '',
        image: '',
        user: {
            _id: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            status: '',
            occupation: '',
            image: '',
            skills: ['']
        }
    },
    newPorject: {
        _id: '',
        email: '',
        name: '',
        description: '',
        image: ''
    },
    projects: [],
    userProject: [],
    loading: false,
    error: ""

}

export const addNewProject = createAsyncThunk(
    'addNewProject',
    async ({ projectData: projectData }: { projectData: NewProject }) => {
        try {
            const result = await axios.post<NewProject>("https://cvmaker-server.onrender.com/api/v1/project/add", projectData);
            return result.data;
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
)
export const getAllProject = createAsyncThunk(
    'getAllProject',
    async () => {
        try {
            const result = await axios.get<{ projectData: Project[] }>("https://cvmaker-server.onrender.com/api/v1/project/all")
            return result.data.projectData
        }
        catch (e) {
            const error = e as AxiosError
            return error
        }
    }
)
export const getAllProjectByEmail = createAsyncThunk(
    'getAllProjectByEmail',
    async (email: {email: string}) => {
        try {
            const result = await axios.post<{ projectData: Project[] }>("https://cvmaker-server.onrender.com/api/v1/project/all/email", email)
            return result.data.projectData
        }
        catch (e) {
            const error = e as AxiosError
            return error
        }
    }
)


const projectSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
        .addCase(addNewProject.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message
            } else {
                state.newPorject = action.payload
            }
            state.loading = false
        })
        .addCase(getAllProject.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message
            } else {
                state.projects = action.payload
            }
            state.loading = false
        })
        .addCase(getAllProjectByEmail.fulfilled, (state, action) => {
            if (action.payload instanceof AxiosError) {
                state.error = action.payload.message
            } else {
                state.userProject = action.payload
            }
            state.loading = false
        })

}})
const educationReducer = projectSlice.reducer
export default educationReducer