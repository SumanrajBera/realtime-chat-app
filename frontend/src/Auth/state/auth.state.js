import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authentication",
    initialState: {
        username: null,
        userId: null,
        isLoading: false
    },
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username
            state.userId = action.payload.userId
        },
        setisLoading: (state, action) => {
            state.isLoading = action.payload
        },
        logout: (state) => {
            state.username = null
            state.userId = null
        }
    }
})

export const { setUser, logout, setisLoading } = authSlice.actions
export default authSlice.reducer