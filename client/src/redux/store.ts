import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/UserReducer";
import educationReducer from "./reducers/EducationReducer";
import projectReducer from "./reducers/ProjectReducer";
import experienceReducer from "./reducers/ExperienceReducer";
import userCVReducer from "./reducers/UserCVReducer";

const store = configureStore({
    reducer: {
        userReducer,
        educationReducer,
        projectReducer,
        experienceReducer,
        userCVReducer
    },
    preloadedState: {
       // favReducer: favData
    }
})


export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export default store