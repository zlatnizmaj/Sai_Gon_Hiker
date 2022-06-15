import React, { useEffect, useState } from 'react';
import { loginUser } from '../redux/apiRequest';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router"

function LoginForm(props) {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        let formBtn = document.querySelector('#login-btn');
        let loginForm = document.querySelector('.login-form-container');
        let formClose = document.querySelector('#form-close');
        formBtn.addEventListener('click', () => {
            loginForm.classList.add('active');
        });

        formClose.addEventListener('click', () => {
            loginForm.classList.remove('active');
        });
        
    }, [])
    const handleLogin = (e)=>{
        e.preventDefault()
        const user = {
            email: email,
            password: password,
        }
        loginUser(user,dispatch, navigate)
    }
    return (
        <div className="login-form-container">
            <i className="fas fa-times" id="form-close" />
            <form>
                <h3>login</h3>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} name="email" className="box" placeholder="enter your email" />
                <input type="password" onChange={(e)=>setPassword(e.target.value)} name="password" className="box" placeholder="enter your password" />
                <input type="submit" defaultValue="login now" className="btn" onClick={handleLogin} />
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">remember me</label>
                <p>forget password? <a href="#">click here</a></p>
                <p>don't have and account? <a href="#">register now</a></p>
            </form>
        </div>
    );
}

export default LoginForm;