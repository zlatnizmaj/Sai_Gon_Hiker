import React from 'react';
function Header(props) {
    const displayChange = () => {
        let menu = document.getElementById('menu-bar')
        let navbar = document.querySelector('.navbar');
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
        console.log(1);
    }
    return (
        <header>
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
            <div className="icons">
                <i className="fas fa-search" id="search-btn" />
                <i className="fas fa-user" id="login-btn" />
            </div>
            <form action className="search-bar-container">
                <input type="search" id="search-bar" placeholder="search here..." />
                <label htmlFor="search-bar" className="fas fa-search" />
            </form>
        </header>
    );
}

export default Header;