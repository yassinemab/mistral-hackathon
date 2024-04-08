import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./reducers/postsReducer"

export default configureStore({
    reducer: {
        user: userReducer,
        posts: postsReducer,
    }
})
