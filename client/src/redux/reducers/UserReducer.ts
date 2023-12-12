import { User } from "../../types/User";
import axios, { AxiosError } from "axios";
import { UserCredential } from "../../types/UserCredential";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NewUser } from "../../types/NewUser";
import { UpdateUser } from "../../types/UpdateUser";

const initialState: {
    user: User,
    emailUser: User,
    newUser: NewUser,
    updateUser: UpdateUser,
    users: User[],
    checkemail: boolean,
    loading: boolean,
    error: string
} = {
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
    },
    emailUser:{
        _id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        status: '',
        occupation: '',
        image: '',
        skills: ['']
    },
    users: [],
    checkemail: false,
    loading: false,
    error: "",
    newUser:
    {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        status: '',
        occupation: '',
        imageSender: '',
        skills: ['']
    },
    updateUser:
    {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        status: '',
        occupation: '',
        skills: ['']
    }
}

export const createSingleUser = createAsyncThunk(
    'createAUser',
    async ({ userData }: { userData: NewUser }) => {
        try {
            const result = await axios.post<NewUser>("http://localhost:2000/api/v1/user/register", userData);
            return result.data; // The returned result will be inside action.payload
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
);

export const login = createAsyncThunk(
    "login",
    async ({ email, password }: UserCredential, { dispatch }) => {
        try {
            const result = await axios.post<{ token: string }>("http://localhost:2000/api/v1/user/login", { email, password })
            const accessToken = result.data.token
            console.log("I am here");
            localStorage.setItem("token", accessToken)
            const authentication = await dispatch(authenticate())
            return authentication.payload as User
        }
        catch (e) {
            const error = e as AxiosError
            return error
        }
    }
)
export const authenticate = createAsyncThunk(
    "authenticate",
    async () => {
        try {
            const authentication = await axios.get<{userData: User}>("http://localhost:2000/api/v1/user",
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
export const getUserByEmail = createAsyncThunk(
    "getUerByEmail",
    async ( email: {email: string}) => {
        console.log(email);
        try {
            const userByEmail = await axios.post<{ userData: User }>(
                "http://localhost:2000/api/v1/user/email",
                email
              );
              return userByEmail.data.userData;
                  
        }
        catch (e) {
            const error = e as AxiosError
            return error
        }
    }
)
export const updateUser = createAsyncThunk(
    'updateUser',
    async ({ userData, userId }: { userData: UpdateUser, userId: string }, { dispatch }) => {
        try {
            console.log("I am here");
            const result = await axios.put<User>(`http://localhost:2000/api/v1/user/${userId}`, userData);
            //return result.data; // The returned result will be inside action.payload
            const authentication = await dispatch(authenticate())
            return authentication.payload as User
        } catch (e) {
            const error = e as AxiosError;
            return error;
        }
    }
    
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(login.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.user = action.payload
                }
                state.loading = false
            })
            .addCase(authenticate.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.user = action.payload
                }
                state.loading = false
            })
            .addCase(getUserByEmail.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.emailUser = action.payload
                }
                state.loading = false
            })
            .addCase(createSingleUser.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.newUser = action.payload;
                }
                state.loading = false
            })
            .addCase(createSingleUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(createSingleUser.rejected, (state, action) => {
                state.error = "Cannot fetch data"
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                if (action.payload instanceof AxiosError) {
                    state.error = action.payload.message
                } else {
                    state.user = action.payload;
                }
                state.loading = false
            })
            .addCase(updateUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = "Cannot fetch data"
            })
    }
})

const userReducer = usersSlice.reducer
export default userReducer