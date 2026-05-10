import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true
})

export const register = async (username, email, password) => {
    const response = await api.post("/register", {
        username, email, password
    })
    return response
}

export const login = async (identifier, password) => {
    const response = await api.post("/login", {
        identifier, password
    })
    return response
}

export const resendEmail = async (identifier) => {
    const response = await api.post("/resend-email", {
        identifier
    })
    return response
}