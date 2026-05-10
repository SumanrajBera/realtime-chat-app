import { register } from "../services/auth.service"
import { useDispatch } from 'react-redux'
import { logout, setisLoading } from "../state/auth.state"
import { toast } from 'react-toastify'

const useAuth = function () {
    const dispatch = useDispatch()
    async function registerUser(username, email, password) {
        try {
            const response = await register(username, email, password);
            toast.success(response.data.message)
        } catch (err) {
            toast.error(err.response.data.message || "Something Went Wrong")
        } finally {
            dispatch(setisLoading(false))
        }
    }

    function logoutUser() {
        dispatch(logout())
    }

    return { registerUser, logoutUser }
}