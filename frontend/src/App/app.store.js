import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../Auth/state/auth.state'

export const store = configureStore({
    reducer: {
        auth: authReducer
    }
})
