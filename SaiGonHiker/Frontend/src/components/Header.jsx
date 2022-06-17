import React, { useState } from 'react';
import './css/style.css';
import LoginForm from './LoginForm';
function Header(props) {
    const [status, setStatus] = useState(false)
    const [user, setUser] = useState()
    const displayChange = () => {
        let menu = document.getElementById('menu-bar')
        let navbar = document.querySelector('.navbar');
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
        console.log(1);
    }
    const statusFormLogin = ()=> {
        console.log(status)
        if(status){
            return (<LoginForm formProps={status} />)
        }
    }
    const checkUser = () => {
        if (!user) {
            return (
                <div className="icons">
                    <i className="fas fa-search" id="icon-1 search-btn" />
                    <i className="fas fa-user" onClick={()=>setStatus(!status)} id="icon-2 login-btn" />
                </div>
            )
        } else {
            return (
                <div className="icons">
                    <i className="fas fa-search" id="search-btn" />
                    <p className="user-login">da dang nhap</p>
                </div>
            )
        }
    }

    return (
        <header>
            {statusFormLogin()}
            <div id="menu-bar" onClick={() => displayChange()} className="fas fa-bars" />
            <a href="#" className="logo"><span>S</span>ai<span>G</span>on <span>H</span>ikers</a>
            <nav className="navbar">
                <a href="#home">home</a>
                <a href="#book">book</a>
                <a href="#packages">packages</a>
                <a href="#services">services</a>
                <a href="#gallery">gallery</a>
                <a href="#review">review</a>
                <a href="#contact">contact</a>
            </nav>
                {checkUser()}
            <form action className="search-bar-container">
                <input type="search" id="search-bar" placeholder="search here..." />
                <label htmlFor="search-bar" className="fas fa-search" />
            </form>
        </header>
    );
}

export default Header;