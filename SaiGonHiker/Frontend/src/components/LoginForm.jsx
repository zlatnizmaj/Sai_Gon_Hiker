import React, { useEffect } from 'react';

function LoginForm(props) {

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
    return (
        <div className="login-form-container">
            <i className="fas fa-times" id="form-close" />
            <form>
                <h3>login</h3>
                <input type="email" name="email" className="box" placeholder="enter your email" />
                <input type="password" name="password" className="box" placeholder="enter your password" />
                <input type="submit" defaultValue="login now" className="btn" />
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">remember me</label>
                <p>forget password? <a href="#">click here</a></p>
                <p>don't have and account? <a href="#">register now</a></p>
            </form>
        </div>
    );
}

export default LoginForm;