import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    registerStart,
    registerFailed,
    registerSuccess
}
from './authSlice';

export const loginUser = async(user, dispatch, navigate) => {
    dispatch(loginStart())
    try {

        const res = await axios.post("https://localhost:5001/api/Auth", user)
        console.log(user)
        dispatch(loginSuccess(res.data))
        navigate("/")
    } catch (err) {
        dispatch(loginFailed())
    }
}

export const registerUser = async(user, dispatch, navigate) => {
    dispatch(registerStart())
    try {
        await axios.post("https://localhost:5001/api/Auth", user)
        dispatch(registerSuccess())
        navigate("/login")
    } catch (err) {
        dispatch(registerFailed())
    }
}