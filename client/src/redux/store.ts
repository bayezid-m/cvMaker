import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./reducers/UserReducer";


const store = configureStore({
    reducer: {
       
        userReducer,
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