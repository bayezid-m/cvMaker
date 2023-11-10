import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/UserReducer";
import educationReducer from "./reducers/EducationReducer";

const store = configureStore({
    reducer: {
       
        userReducer,
        educationReducer,
    },
    preloadedState: {
       
       // favReducer: favData
    }
})
// store.subscribe(() => {
//     localStorage.setItem("fav", JSON.stringify(store.getState().favReducer))
// })

export type GlobalState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 
export default store